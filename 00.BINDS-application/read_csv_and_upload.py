import os,sys, json
import sqlite3
import pprint
import pandas as pd
from pymongo import MongoClient
client = MongoClient('localhost', 27017)

csv_file=sys.argv[1]

#df=pd.read_csv(csv_file)
df=pd.read_csv(csv_file, encoding="shift-jis")
df.columns

# CSVファイルを読み込んでJSONにする
json_strings = df.to_json(orient='records')

parsed = json.loads(json_strings)

print("JSON_STRING")
print(json_strings)
print("Parsed JSON strings")
print(parsed)

db = client.binds
col = db.application
result = col.insert_many(parsed)

# post_id = "612877bdffcc8a6a42f44b1f"
# pprint.pprint(col.find_one({"name": "Kunio Hirata"}))
