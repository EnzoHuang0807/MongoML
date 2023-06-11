import pandas as pd
import numpy as np
import seaborn as sn
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import missingno as msno
import math

def heatmap(predict: pd.DataFrame, label: pd.DataFrame):

    df = pd.DataFrame({'Predict': predict, 'Label': label})
    data = pd.crosstab(df['Predict'], df['Label'])

    hm = sn.heatmap(data=data, annot=True, cmap='Blues', fmt='g')
    plt.savefig("heatmap.png")
    plt.close()


def barChart(Y: np.ndarray):

    unique, counts = np.unique(Y, return_counts=True)
    result = dict(zip(unique, counts))

    plt.bar(result.keys(), result.values())
    plt.savefig("barchart.png")
    plt.close()


def missingMap(df: pd.DataFrame):

    msno.matrix(df)
    plt.savefig("tmp.png")
    plt.close()

def numeric_feature_boxchart(df: pd.DataFrame):

    data = df.copy()
    string_cols = data.select_dtypes(include=['object']).columns.tolist()
    data.drop(string_cols, axis=1, inplace=True)

    nf = data.columns
    n = 5

    plt.figure(figsize=[15, 4 * math.ceil(len(nf) / n)])
    for i in range(len(nf)):
        plt.subplot(math.ceil(len(nf) / 3), n, i + 1)
        data.boxplot(nf[i])

    plt.tight_layout()
    plt.savefig("tmp.png")
    plt.close()
