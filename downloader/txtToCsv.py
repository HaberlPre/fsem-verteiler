# -*- coding: utf-8 -*-
"""
Created on Wed Feb  3 18:33:35 2021

@author: lucas
"""

from os import listdir
from os.path import isfile, join
import numpy as np
import pandas as pd 
import csv

mypath = "./Downloads" #an jeweiligen Use-case anpassen
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
onlyfiles = sorted(onlyfiles)
myStrFileName = onlyfiles[-1]
#print(onlyfiles)
#print(myStrFileName)
#myStrFile = np.loadtxt(mypath+"/"+myStrFileName)
myStrFile = open(mypath+"/"+myStrFileName, "r", encoding="utf-8")
contents = myStrFile.read()
contents = contents.replace('[[" ', "")
contents = contents.replace(' "]]', "")

splitUser = contents.split(' "],["')
splitUserSplitData = []
for user in splitUser:
    splitUserSplitData.append(user.split(',"XsepX",'))
    
for i in range(len(splitUserSplitData)):
    for j in range(len(splitUserSplitData[i])):
        splitUserSplitData[i][j] = splitUserSplitData[i][j].replace(" ", "")
        splitUserSplitData[i][j] = splitUserSplitData[i][j].replace('"', "")
        if j==2:
            splitUserSplitData[i][j] = splitUserSplitData[i][j].replace(";", ",")
        else:
            splitUserSplitData[i][j] = splitUserSplitData[i][j]+";"




outArray = np.asarray(splitUserSplitData)
pd.DataFrame(outArray).to_csv("./Downloads/csv/data.csv")