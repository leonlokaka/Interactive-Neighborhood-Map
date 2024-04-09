
import os
from django.test import TestCase

from inm_backend.models.neighbourhood_crime_rates import json_to_NeighbourhoodCrimeRates
from inm_backend.models.neighbourhoods import json_to_Neighbourhoods
from inm_backend.models.parks_and_recreation_facilities import json_to_ParksAndRecreationFacilities
from inm_backend import settings


class TestNeighbourhoods(TestCase):
    def test_json_to_Neighbourhoods(self):
        data_path = 'data/neighbourhoods.json'
        with open(os.path.join(os.path.dirname(__file__), data_path), "r") as file:
            documents = json_to_Neighbourhoods(file.read(), save=True)
            self.assertEqual(len(documents), 3)
            self.assertEqual(documents[0]['area_long_code'], 19)

class TestNeighbourhoodCrimeRates(TestCase):
    def test_json_to_NeighbourhoodCrimeRates(self):
        data_path = 'data/neighbourhood_crime_rates.json'
        with open(os.path.join(os.path.dirname(__file__), data_path), "r") as file:
            documents = json_to_NeighbourhoodCrimeRates(file.read(), save=True)
            self.assertEqual(len(documents), 20)
            self.assertEqual(documents[0]['hood_id'], 19)


class TestParksAndRecreationFacilities(TestCase):
    def test_json_to_ParksAndRecreationFacilities(self):
        data_path = 'data/parks_and_recreation_facilities.json'
        with open(os.path.join(os.path.dirname(__file__), data_path), "r") as file:
            documents = json_to_ParksAndRecreationFacilities(file.read(), save=True)
            self.assertEqual(len(documents), 3)
            # self.assertIsNotNone(documents[0]['area_long_code'])