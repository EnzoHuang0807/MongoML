from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from preprocess import preprocess_data
from chart import *
from base64 import encodebytes, b64decode
from PIL import Image
import numpy as np
import pandas as pd
import argparse
import os
import io

from model import *

# Initializing flask app
app = Flask(__name__)
CORS(app)

def train_model(data : pd.DataFrame, test_data : pd.DataFrame, 
                y_column : str, model_type : str):
    
    # extract X and Y
    X = data.drop([y_column], axis=1)
    Y = data[y_column].copy()

    if model_type == 'CatBoostRegressor':

        model = Model_Cat_Regressor()
        Train_Y = model.fit(X, Y)
        print("Train complete")
        Test_Y = model.predict(test_data)

    elif model_type == 'LightGBMRegressor':

        model = Model_LGBM_Regressor()
        Train_Y = model.fit(X, Y)
        print("Train complete")
        Test_Y = model.predict(test_data)

    else : 

        if model_type != 'LinearRegression':
            print(f"{model_type=} not found, default to LinearRegression")

        # default Linear Regression
        # train model

        pinv_X = np.linalg.pinv(X.to_numpy())
        pinv_Y = np.array(Y)
        w_LIN = np.matmul(pinv_X, pinv_Y)
        print("Train complete")

        # Make predictions with new data
        Train_Y = np.matmul(X.to_numpy(), w_LIN)
        Test_Y = np.matmul(test_data.to_numpy(), w_LIN)

    Train_Y = list(map(round, Train_Y))
    Test_Y = list(map(round, Test_Y))
    return (Test_Y, Train_Y, Y)


def get_content(filename, substring):
    with open(filename, 'r') as file:
        content = file.read()
        substrings = content.split(substring)

    if len(substrings) >= 3:
        return substring + substring.join(substrings[2:-1])
    else:
        return ""

def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img


# Route for get db
@app.route('/db', methods = ['GET'])
def db():
    response = {'response_type': 'info', 
                    'data': db_client.list_database_names()}
    return jsonify(response)


# Route for get collection
@app.route('/collection', methods = ['POST'])
def collection():
    data = request.json
    db = db_client[data["database"]]

    response = {'response_type': 'info', 
                    'data': db.list_collection_names()}
    return jsonify(response)


# Route for get feature
@app.route('/feature', methods = ['POST'])
def feature():
    data = request.json
    db = db_client[data["database"]]
    collection = data["collection"]

    response = {'response_type': 'info', 
                    'data': list(db[collection].find_one().keys())}
    return jsonify(response)



# Route for machine learning
@app.route('/machine_learning', methods = ['POST'])
def machine_learning():

    #input_data
    data = request.json
    database = data['database']

    train_collection = data['train_collection']
    test_collection = data['test_collection']

    model = data['model']
    predict_column = data['predict_column']
    preprocessing_methods = data['preprocessing_methods']

    #select db and collection
    db = db_client[database]

    if train_collection not in db.list_collection_names():
        response = {'response_type': 'error', 
                    'data': 'Requested train collection does not exist'}
        return jsonify(response)

    if test_collection not in db.list_collection_names():
        response = {'response_type': 'error', 
                    'data': 'Requested test collection does not exist'}
        return jsonify(response)

    train_collection = db[train_collection]
    test_collection = db[test_collection]

    try:
        # Load and preprocess the data
        train_data = pd.DataFrame(train_collection.find({}))
        preprocessed_train_data = preprocess_data(train_data, preprocessing_methods, train_data.columns)

        test_data = pd.DataFrame(test_collection.find({}))
        preprocessed_test_data = preprocess_data(test_data, preprocessing_methods, test_data.columns)

        # Access the predictions
        train_result = train_model(preprocessed_train_data, preprocessed_test_data, predict_column, model)
        predictions = train_result[0]
        predict_train_y = train_result[1]
        train_y = train_result[2]

        # Send back the predictions to the client
        response = {'response_type': 'predictions', 'data': np.mean(predictions)}
        
    except Exception as e:
        return jsonify({'response_type': 'error', 'data': str(e)})

    
    #generate image
    heatmap(predict_train_y, train_y)
    barChart(predictions)

    #sending response to client
    response['heatmap'] = get_response_image("heatmap.png")
    response['barchart'] = get_response_image("barchart.png")
    
    os.system("rm heatmap.png barchart.png")
    return jsonify(response)



# Route for data exploration
@app.route('/data_exploration', methods = ['POST'])
def data_exploration():

    #input data
    data = request.json
    database = data['database']
    collection = data['collection']
    figure = data['figure_type']

    #select db and collection
    db = db_client[database]
    collection = db[collection]
    data = pd.DataFrame(collection.find({}))

    # Send picture
    if 'show_missing_values' == figure:
        missingMap(data)

    elif 'show_feature_distributions' == figure:
        numeric_feature_boxchart(data)

    #sending response to client
    encoded_img = get_response_image("tmp.png")
    response = {'response_type': 'data_exploration', 'data': encoded_img}

    os.system("rm tmp.png")
    return jsonify(response)



# Route for mongodb operation
@app.route('/mongodb_operation', methods = ['POST'])
def mongodb_exploration():

    #input data
    data = request.json
    user_query = data['db_operation']
    database = data['database']

    print(user_query, database)
    #write .js script
    file_path = "tmp.js"
    js_code = f"use {database}\n{user_query}"
    with open(file_path, "w") as js_file:
        js_file.write(js_code)

    os.system("mongosh < tmp.js > tmp.out")
    os.system("rm tmp.js")
    result = get_content("tmp.out", database)
    os.system("rm tmp.out")
    print(result)

    #sending response to client
    response = {'response_type': 'mongodb_operation', 'data': result}
    return jsonify(response)


if __name__ == '__main__':

    # Parse command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, help='Specify the port number', default=5000)
    args = parser.parse_args()

    # connect to mongodb
    db_client = MongoClient('127.0.0.1', 27017)
    print("Successfully connected to mongoDB")

    # Running app
    app.run(port=args.port)

