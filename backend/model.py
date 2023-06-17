from catboost import CatBoostRegressor, Pool
import pandas as pd

class Model_Cat_Regressor():

    def __init__(self):
        self.model = CatBoostRegressor()
        self.isFit = False
        
    def fit(self, X: pd.DataFrame, Y):
        #X_train, X_val, y_train, y_val = train_test_split(X, Y, test_size=0.2, random_state=42)
        #train_pool = Pool(X_train, y_train,)
        #val_pool = Pool(X_val, y_val,)
        #self.model.fit(train_pool, eval_set=val_pool, verbose=0)
        train_pool = Pool(X, Y)
        self.model.fit(train_pool, verbose=0)
        pred_Y = self.model.predict(X)
        return pred_Y
        
    def predict(self, data: pd.DataFrame):
        if self.isFit == False:
            print("Model not trained yet. Use model.fit() first.")
            return
        return self.model.predict(data)
