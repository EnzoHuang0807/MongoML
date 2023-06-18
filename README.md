# Introduction

This repository is the final project of NTU 2023 Spring Database Management System – from SQL to NoSQL. Our group members include 林天行, 黃千睿, 黃品翰, 王雅茵, 王睿謙.



In this project, we propose an extended MongoDB platform which not only support origina MongoDB queries, but also can perform 

- Data Exploration
- Data Preprocessing
- Machine Learning



# How to use?

1. Create a virtual environment (Optional):

   ```bash
   conda create --name mongodb
   conda activate mongodb
   ```

2. Install packages

   ```bash
   pip install -r requirements.txt
   ```

3. Run MongoDB at `localhost:27017` and import data set beforehand (you can modify the file path in `data_init.py` to import your own data )

   (*Note: The train/test collections we provided are meant to predict 'Danceability', the label column of this dataset. Error may occur in the attempt to predict other columns since the test collection doesn't contain 'Danceability' column.*)

   ```bash
   python3 backend/data_init.py
   ```


4. Start server on a machine

   ```bash
   python3 backend/server.py
   ```

5. Start client

   **For mac users:**
   
   ```bash
   brew install yarn
   brew install node
   cd frontend/
   yarn install
   yarn start
   ```
   
   **For Linux users:**
   
   ```bash
   sudo apt-get install nodejs
   sudo apt install npm
   npm install --global yarn
   cd frontend/
   yarn install
   yarn start
   ```
   
   **For Window users:**
   
   please don't use Window or use WSL2

# Architecture Design

1. Users send request to a remote server (the mongodb service is on this remote server).

2. The remote server will perform the users' request on data from MongoDB.

3. The remote server sends the result back to the client.

   ![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/architecture.png?raw=true)

# Advantage

We can deploy all the machine learning models on remote server, and use the computing resources of server to process datasets and train model. Client side just need to send request and receive result from server.

Also, We design an UI interface for clients to decide what kind of operations they want to perform and how they want to perform. This way, even users without machine learning or computer science knowledge can easliy do data exploration, data preprocessing, and machine learning by just clicking on UI interface instead of using command line.

# Implementation

There are two parts of this project: the original MongoDB part and the extended MongoDB part.

Original MongoDB implementation:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/original_implementation.png?raw=true)

Extended MongoDB implementation:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/extended_implementation.png?raw=true)

# Demo

1. Original MongoDB queries:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/original_mongodb_query.png?raw=true)

2. Data Exploration: show feature distributions

   ![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/feature_distribution.png?raw=true)

3. Data Exploration: show missing values

   ![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/missing_value.png?raw=true)

4. Machine Learning:

   ![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/machine_learning.png?raw=true)



Furthermore, our UI will list the available databases, collections, and predict columns users can choose:

Show databases list:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/select_db.png?raw=true)

Show collections list:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/select_coll.png?raw=true)

Show predict columns list:

![](https://github.com/EnzoHuang0807/MongoML/blob/main/pic/select_predict_column.png?raw=true)



# Video Link

[https://youtu.be/GoHedU9qSQU](https://youtu.be/GoHedU9qSQU?fbclid=IwAR1Gy2JiDvvMg9New4-zTep4gLUXwvVvBhXhJj5b8h4NRJNyZsW3HqyY5rI)

