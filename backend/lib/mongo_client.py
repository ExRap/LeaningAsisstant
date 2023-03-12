import pymongo  # package for working with MongoDB
mongo_client = pymongo.MongoClient("mongodb://adminuser:password123@mongodb.default.svc.cluster.local:27017/?ssl=false")
exrap_db = mongo_client['exrap']