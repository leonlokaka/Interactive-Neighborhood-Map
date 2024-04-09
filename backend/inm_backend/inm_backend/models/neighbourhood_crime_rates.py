import datetime
import json
from mongoengine import *
from inm_backend.utils import get_mongodb_alias


class NeighbourhoodCrimeRates(Document):
    meta = {
        "db_alias": get_mongodb_alias(),
        'collection': 'neighbourhood_crime_rates',
        'indexes': [
            {
                'fields': ['year', 'hood_id'],
                'unique': True,  # Set to True if you want a unique index
                'sparse': True  # Set to True if you want to ignore documents that don't have this field
            }
        ],
    }
    data_id = IntField()
    year = IntField()
    area_name = StringField()
    hood_id = IntField()
    population = IntField()
    assault = IntField()
    assault_rate = FloatField()
    autotheft = IntField()
    autotheft_rate = FloatField()
    biketheft = IntField()
    biketheft_rate = FloatField()
    breakenter = IntField()
    breakenter_rate = FloatField()
    homicide = IntField()
    homicide_rate = FloatField()
    robbery = IntField()
    robbery_rate = FloatField()
    shooting = IntField()
    shooting_rate = FloatField()
    theftfrommv = IntField()
    theftfrommv_rate = FloatField()
    theftover = IntField()
    theftover_rate = FloatField()
    updatedAt = DateTimeField(default=datetime.datetime.now)


def json_to_NeighbourhoodCrimeRates(json_str, save: bool = False):
    documents = []
    data = json.loads(json_str)
    features = data.get('features', [])

    # Parse and separate the properties and year
    for feature in features:
        properties = feature['properties']
        # Get the list of years
        years = [int(key.split('_')[-1])
                 for key in properties if key.startswith('ASSAULT_')]
        years = list(set(years))
        for year in years:
            doc = NeighbourhoodCrimeRates(
                data_id=int(properties.get('_id')),
                year=year,
                area_name=str(properties.get('AREA_NAME')).strip(),
                hood_id=int(properties.get('HOOD_ID')),
                population=int(properties.get(f'POPULATION_{year}', 0)),
                assault=int(properties.get(f'ASSAULT_{year}', 0)),
                assault_rate=float(properties.get(f'ASSAULT_RATE_{year}', 0)),
                autotheft=int(properties.get(f'AUTOTHEFT_{year}', 0)),
                autotheft_rate=float(properties.get(
                    f'AUTOTHEFT_RATE_{year}', 0)),
                biketheft=int(properties.get(f'BIKETHEFT_{year}', 0)),
                biketheft_rate=float(properties.get(
                    f'BIKETHEFT_RATE_{year}', 0)),
                breakenter=int(properties.get(f'BREAKENTER_{year}', 0)),
                breakenter_rate=float(properties.get(
                    f'BREAKENTER_RATE_{year}', 0)),
                homicide=int(properties.get(f'HOMICIDE_{year}', 0)),
                homicide_rate=float(properties.get(
                    f'HOMICIDE_RATE_{year}', 0)),
                robbery=int(properties.get(f'ROBBERY_{year}', 0)),
                robbery_rate=float(properties.get(f'ROBBERY_RATE_{year}', 0)),
                shooting=int(properties.get(f'SHOOTING_{year}', 0)),
                shooting_rate=float(properties.get(
                    f'SHOOTING_RATE_{year}', 0)),
                theftfrommv=int(properties.get(f'THEFTFROMMV_{year}', 0)),
                theftfrommv_rate=float(properties.get(
                    f'THEFTFROMMV_RATE_{year}', 0)),
                theftover=int(properties.get(f'THEFTOVER_{year}', 0)),
                theftover_rate=float(properties.get(
                    f'THEFTOVER_RATE_{year}', 0)),
            )
            documents.append(doc)
            obj_dict = {field: getattr(doc, field)
                        for field in doc._fields if field != 'id'}
            if (save):
                NeighbourhoodCrimeRates.objects(
                    year=doc.year, hood_id=doc.hood_id).update(upsert=True, **obj_dict)

    return documents
