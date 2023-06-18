import pandas as pd
from pymongo import MongoClient
import json

def mongoimport(csv_path, db_name, coll_name, db_client):

    db = db_client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.insert_many(payload)


if __name__ == '__main__':

    # connect to mongodb
    db_client = MongoClient('127.0.0.1', 27017)

    mongoimport('./data/train.csv', "ML_final", "train", db_client)
    print("Import train to MongoDB Done")

    mongoimport('./data/test.csv', "ML_final", "test", db_client)
    print("Import test to MongoDB Done")
