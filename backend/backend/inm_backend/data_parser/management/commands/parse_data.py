
from django.core.management.base import BaseCommand
import argparse
from enum import Enum

from data_parser.models.neighbourhood_crime_rates import NeighbourhoodCrimeRates, json_to_NeighbourhoodCrimeRates
from data_parser.models.neighbourhoods import Neighbourhoods, json_to_Neighbourhoods
from data_parser.models.parks_and_recreation_facilities import json_to_ParksAndRecreationFacilities
from data_parser.parser import ParserArgs, start_parse_data

class DataTarget(Enum):
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
        params = None
        
        if target == DataTarget.neighbourhoods.value:
            params = ParserArgs(id="neighbourhoods",
                        name="Neighbourhoods", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_Neighbourhoods )
        elif target == DataTarget.neighbourhood_crime_rates.value:
            params = ParserArgs(id="neighbourhood_crime_rates",
                        name="neighbourhood_crime_rates", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_NeighbourhoodCrimeRates)
        elif target == DataTarget.parks_and_recreation_facilities.value:
            params = ParserArgs(id="parks_and_recreation_facilities",
                        name="Parks and Recreation Facilities", format_1="GEOJSON", format_2="4326", handle_json_function=json_to_ParksAndRecreationFacilities)

        
        if params:
            result = start_parse_data(params)
            print("Command success" if result else "Command failed")
        else: 
            print("Command incorrect argument")
