import datetime
import json
from mongoengine import *
from inm_backend.models.neighbourhoods import Neighbourhoods
from inm_backend.utils import get_mongodb_alias, point_in_geometry

class ParksAndRecreationFacilities(Document):
    meta = {
        "db_alias": get_mongodb_alias(),
        'collection': 'parks_and_recreation_facilities',
        'indexes': [
            {
                'fields': ['locationid'],
                'unique': True,  # Set to True if you want a unique index
                'sparse': True  # Set to True if you want to ignore documents that don't have this field
            }
        ]
    }
    data_id = IntField()
    area_long_code = IntField(null=True, required=False)
    locationid = StringField()
    asset_id = IntField()
    asset_name = StringField()
    type = StringField()
    amenities = StringField()
    address = StringField()
    phone = StringField()
    url = StringField()
    geometry = StringField()
    updatedAt = DateTimeField(default=datetime.datetime.now)

def json_to_ParksAndRecreationFacilities(json_str, save: bool = False):
    documents = []
    data = json.loads(json_str)
    features = data.get('features', [])

    # Query Neighbourhoods area and assign to data
    neighbourhoods = Neighbourhoods.objects()
    areaGeometries = []
    for neighbourhood in neighbourhoods:
        areaGeometries.append({
                                "area_long_code": neighbourhood.area_long_code,
                                "geometryData": neighbourhood.geometry
                            })
    

    for feature in features:
        properties = feature.get('properties', {})
        geometry = feature.get('geometry', {})
        area_long_code=None
        # find area
        for areaGeometry in areaGeometries:
            if point_in_geometry(areaGeometry.get('geometryData'), geometry['coordinates'][0]):
                area_long_code = areaGeometry.get('area_long_code')

        doc = ParksAndRecreationFacilities(
            data_id=int(properties.get('_id')),
            area_long_code = area_long_code,
            locationid=str(properties.get('LOCATIONID')).strip(),
            asset_id=int(properties.get('ASSET_ID')),
            asset_name=str(properties.get('ASSET_NAME')).strip(),
            type=str(properties.get('TYPE')).strip(),
            amenities=str(properties.get('AMENITIES')).strip(),
            address=str(properties.get('ADDRESS')).strip(),
            phone=str(properties.get('PHONE')).strip(),
            url=str(properties.get('URL')).strip(),
            geometry=json.dumps(geometry),  # Convert geometry to JSON string
        )
        documents.append(doc)
        obj_dict = {field: getattr(doc, field)
                    for field in doc._fields if field != 'id'}
        if (save):
            ParksAndRecreationFacilities.objects(locationid=doc.locationid).update(upsert=True, **obj_dict)
            
    return documents
