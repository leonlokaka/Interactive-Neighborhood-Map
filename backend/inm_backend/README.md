
## Running Tests

To run tests, run the following command

```bash
  python manage.py test
```



## Parse Data
Start getting data from datasource and store into DB
```
python manage.py parse_data all
```

Also can parse specific type of data
```
python manage.py parse_data neighbourhoods
python manage.py parse_data neighbourhood_crime_rates
python manage.py parse_data parks_and_recreation_facilities
```

## Running API Server

To run tests, run the following command

```bash
  python manage.py runserver
```
or
```bash
  python manage.py runserver 0.0.0.0:8881
```

## Running Unit Test
All
```bash
python manage.py test  data_parser.tests.test_models.TestNeighbourhoodCrimeRates
```

Run one of the test case
```bash
python manage.py test  data_parser.tests.test_models.TestNeighbourhoodCrimeRates
```


## Running API Server in Production

To run production, run the following command

```bash
  python manage.py runserver 0.0.0.0:8881 --settings=inm_backend.prod_settings
```