# pymongo approach. now use mongo-engine instead
# from django.conf import settings
# from pymongo import MongoClient
# class MongoConnection:
#     @staticmethod
#     def get_connection():
#         mongo_settings = settings.MONGODB_DATABASES['default']
#         host = mongo_settings['host']
#         port = mongo_settings['port']
#         username = mongo_settings['username']
#         password = mongo_settings['password']
#         tz_aware = mongo_settings['tz_aware']
#         client = MongoClient(host=host,port=int(port),username=username,password=password, tz_aware=tz_aware)
#         return client[mongo_settings['name']]

import sys
from shapely.geometry import Point, Polygon


def is_test_mode() -> bool:
    return 'test' in sys.argv

def get_mongodb_alias() -> str:
    return "default" if not is_test_mode() else "test"

def point_in_geometry(geometry, point_coordinates):
    point = Point(point_coordinates)
    for polygons in geometry.get('coordinates'):
        for polygonCoors in polygons:
            polygon = Polygon(polygonCoors)
            if polygon.contains(point):
                return True
    return False

def center_point_of_geometry(geometry):
    centroids = []
    for polygons in geometry.get('coordinates'):
        for polygonCoors in polygons:
            polygon = Polygon(polygonCoors)
            centroids.append(polygon.centroid)
            
    if(len(centroids) == 1):
        return centroids[0].x, centroids[0].y
    elif(len(centroids) > 1):
        total_x = total_y = 0
        for centroid in centroids:
            total_x += centroid.x
            total_y += centroid.y
        center_x = total_x / len(centroids)
        center_y = total_y / len(centroids)
        return center_x, center_y
    return None, None