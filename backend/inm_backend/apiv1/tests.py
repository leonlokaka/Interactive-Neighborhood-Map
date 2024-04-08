from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase

class ViewTestCase(APITestCase):
    def test_neighbourhoods_geometry(self):
        url = reverse('neighbourhoods_geometry')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertGreater(len(response.data[0]['geometry']['coordinates']), 0)


    def test_neighbourhoods_data_all(self):
        url = reverse('neighbourhoods_data')

        get_params = {'select_data_list': '["all"]', 'geometry': 1}
        response = self.client.get(url, data=get_params)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.data), 3)
        self.assertGreater(len(response.data[0]['geometry']['coordinates']), 0)

    def test_neighbourhoods_data_wrong_params(self):
        url = reverse('neighbourhoods_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 400)
        
    def test_neighbourhood_crime_rates_year_range(self):
        url = reverse('neighbourhood_crime_rates_year_range')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.data)
        self.assertEqual(response.data['min_year'], 2014)
        
    def test_neighbourhood_crime_rates_year_options(self):
        url = reverse('neighbourhood_crime_rates_year_options')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 10)
        self.assertEqual(response.data[0]['__value'], 2023)
        
    def test_neighbourhood_area_options(self):
        url = reverse('neighbourhood_area_options')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]['__text'], "Long Branch")

    def test_neighbourhood_crime_rates_yearly_stat(self):
        url = reverse('neighbourhood_crime_rates_yearly_stat')
        get_params = {'year': 2023}
        response = self.client.get(url, data=get_params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data[0]), 19)
        self.assertEqual(response.data[0]['max_assault_rate'], 827.5148926)

    def test_neighbourhood_crime_rates_yearly_stat_wrong_param(self):
        url = reverse('neighbourhood_crime_rates_yearly_stat')
        get_params = {'year': 2000}
        response = self.client.get(url, data=get_params)
        self.assertEqual(response.status_code, 400)

    def test_neighbourhood_crime_rates_yearly_stat_no_param(self):
        url = reverse('neighbourhood_crime_rates_yearly_stat')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 400)

        