
from django.core.management.base import BaseCommand
import argparse
from enum import Enum

from inm_backend.models.neighbourhood_crime_rates import NeighbourhoodCrimeRates, json_to_NeighbourhoodCrimeRates
from inm_backend.models.neighbourhoods import Neighbourhoods, json_to_Neighbourhoods
from inm_backend.models.parks_and_recreation_facilities import json_to_ParksAndRecreationFacilities
from data_parser.parser import ParserArgs, start_parse_data


class DataTarget(Enum):
    all = "all"
    neighbourhoods = "neighbourhoods"
    neighbourhood_crime_rates = "neighbourhood_crime_rates"
    parks_and_recreation_facilities = "parks_and_recreation_facilities"


class Command(BaseCommand):
    help = 'Request, parse and store data from source'

    def add_arguments(self, parser):
        # Define command-line arguments
        parser.add_argument('target', help='target data')

    def handle(self, *args, **kwargs):
        # Access the command-line arguments
        target = kwargs['target']
        params = []

        if target == DataTarget.all.value or target == DataTarget.neighbourhoods.value:
            params.append(ParserArgs(id="neighbourhoods",
                                     name="Neighbourhoods", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_Neighbourhoods))
        if target == DataTarget.all.value or target == DataTarget.neighbourhood_crime_rates.value:
            params.append(ParserArgs(id="neighbourhood-crime-rates",
                                     name="neighbourhood-crime-rates", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_NeighbourhoodCrimeRates))
        if target == DataTarget.all.value or target == DataTarget.parks_and_recreation_facilities.value:
            params.append(ParserArgs(id="parks-and-recreation-facilities",
                                     name="Parks and Recreation Facilities", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_ParksAndRecreationFacilities))

        if params:
            for param in params:
                result = start_parse_data(param)
                print(f"Parse {param.id} success"if result else f"Parse {param.id} failed")
        else:
            print("Command incorrect argument")
