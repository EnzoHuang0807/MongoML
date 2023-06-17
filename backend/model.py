from catboost import CatBoostRegressor, Pool
import pandas as pd
from lightgbm import LGBMRegressor

class Model_Cat_Regressor():

    def __init__(self):
        self.model = CatBoostRegressor()
        self.isFit = False
        
    def fit(self, X: pd.DataFrame, Y):
        train_pool = Pool(X, Y)
        self.model.fit(train_pool, verbose=0)
        pred_Y = self.model.predict(X)
        self.isFit = True
        return pred_Y
        
    def predict(self, data: pd.DataFrame):
        if self.isFit == False:
            print("Model not trained yet. Use model.fit() first.")
            return
        return self.model.predict(data)

class Model_LGBM_Regressor():
    def __init__(self):
        self.model = LGBMRegressor(verbosity=-100)
        self.isFit = False
        
    def fit(self, X: pd.DataFrame, Y):
        self.model.fit(X, Y)
        pred_Y = self.model.predict(X)
        self.isFit = True
        return pred_Y
        
    def predict(self, data: pd.DataFrame):
        if self.isFit == False:
            print("Model not trained yet. Use model.fit() first.")
            return
        return self.model.predict(data)
