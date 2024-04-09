import csv
from io import StringIO
from django.shortcuts import render
import requests

from inm_backend.models.neighbourhoods import Neighbourhoods, json_to_Neighbourhoods

# https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show?id=neighbourhoods
# https://ckan0.cf.opendata.inter.prod-toronto.ca/datastore/dump/6cc2dbf4-96d3-4faa-8bcf-4ad3f688a1dc
# https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search?id=6cc2dbf4-96d3-4faa-8bcf-4ad3f688a1dc
# https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/neighbourhoods/resource/db634f74-36c9-4caa-84be-256e304a89de/download/neighbourhoods-4326.csv


class ParserArgs:
    def __init__(self, id, name, format_1, format_2, handle_json_function) -> None:
        self.id = id
        self.name = name
        self.format_1 = format_1
        self.format_2 = format_2
        self.handle_json_function = handle_json_function

# def parse_csv_string_and_save(csv_string, object_type):
#     csv.field_size_limit(1000000)
#     csv_file = StringIO(csv_string)
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         # Convert row to MyDocument instance
#         document = object_type(**row)
#         document.save()


def start_parse_data(params: ParserArgs) -> bool:
    url = get_url_from_datastore(params)
    if not url:
        return False
    print('data_url', url)
    file_content = requests.get(url).text
    print( 'file_content length: ', len(file_content) )
    params.handle_json_function(file_content, save=True)
    return True
    # return render(request, 'main.html', {"data": file_content})


def get_url_from_datastore(params: ParserArgs):
    # Toronto Open Data is stored in a CKAN instance. It's APIs are documented here:
    # https://docs.ckan.org/en/latest/api/

    # To hit our API, you'll be making requests to:
    base_url = "https://ckan0.cf.opendata.inter.prod-toronto.ca"

    # Datasets are called "packages". Each package can contain many "resources"
    # To retrieve the metadata for this package and its resources, use the package name in this page's URL:
    url = base_url + "/api/3/action/package_show"
    res = requests.get(url, params={"id": params.id})
    package = res.json()
    
    # print(package)
    # To get resource data:

    resources = package["result"]["resources"]
    active_resource = [resource for resource in resources if resource["datastore_active"]
                       and resource["name"] == params.name]
    if len(active_resource) == 0:
        return None

    cache_id = active_resource[0]['datastore_cache'][params.format_1]
    if params.format_2:
        cache_id = cache_id[params.format_2]
    data = [data for data in resources if data['id'] == cache_id]
    if len(data) == 0:
        return None
    data_url = data[0]['url']

    return data_url
