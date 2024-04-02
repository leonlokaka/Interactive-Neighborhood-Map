
from django.shortcuts import render
from django.template import engines

# from . import utils


def main(request):

    # pymongo
    # db = utils.MongoConnection.get_connection()
    # db.data.insert_one({'name': 'John', 'age': 30})
    # result = db.data.find_one({'name': 'John'})
    # print(result)


    return render(request, "home.html", {"name": "home"})