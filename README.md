# Introduction

This repository is the final project of NTU 2023 Spring Database Management System – from SQL to NoSQL. Our group members include 林天行, 黃千睿, 黃品翰, 王雅茵, 王睿謙.



In this project, we propose an extended MongoDB platform which not only support origina MongoDB queries, but also can perform 

- Data Exploration
- Data Preprocessing
- Machine Learning



# How to use?

**For mac users:**

1. Create a virtual environment (Optional):

   ```bash
   conda create --name mongodb
   conda activate mongodb
   ```

2. Install packages

   ```bash
   pip install -r requirements.txt
   ```

3. Start server on a machine

   ```bash
   python3 backend/server.py
   ```

4. Start client on another machine

   ```bash
   brew install yarn
   brew install node
   cd Frontend/
   yarn install
   yarn start
   ```



# Architecture Design

1. Users send request to a remote server (the mongodb service is on this remote server).

2. The remote server will perform the users' request on data from MongoDB.

3. The remote server sends the result back to the client.

   ![](/Users/kevin.lin/Desktop/Pic/Screen Shot 2023-06-17 at 7.36.54 PM.png)

# Advantage

We can deploy all the machine learning models on remote server, and use the computing resources of server to process datasets and train model. Client side just need to send request and receive result from server.

Also, We design an UI interface for clients to decide what kind of operations they want to perform and how they want to perform. This way, even users without machine learning or computer science knowledge can easliy do data exploration, data preprocessing, and machine learning by just clicking on UI interface instead of using command line.

# Implementation

There are two parts of this project: the original MongoDB part and the extended MongoDB part.

Original MongoDB implementation:

![](/Users/kevin.lin/Desktop/Pic/Screen Shot 2023-06-17 at 7.48.52 PM.png)

Extended MongoDB implementation:

![](/Users/kevin.lin/Desktop/Pic/Screen Shot 2023-06-17 at 7.50.01 PM.png)

# Demo

