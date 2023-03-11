import pymongo  # package for working with MongoDB
mongo_client = pymongo.MongoClient("mongodb://mongodb:27017/")
pomodoro_db = mongo_client['pomodoro']