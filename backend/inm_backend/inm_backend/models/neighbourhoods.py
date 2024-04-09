import datetime
import json
from mongoengine import *
from inm_backend.utils import get_mongodb_alias
from rest_framework_mongoengine.serializers import DocumentSerializer


class Neighbourhoods(Document):
    meta = {
        "db_alias": get_mongodb_alias(),
        'collection': 'neighbourhoods',
        'indexes': [
            {
                'fields': ['area_long_code'],
                'unique': True,  # Set to True if you want a unique index
                'sparse': True  # Set to True if you want to ignore documents that don't have this field
            }
        ]
    }
    data_id = IntField()
    area_id = IntField()
    area_attr_id = IntField()
    parent_area_id = IntField()
    area_short_code = IntField()
    area_long_code = IntField()
    area_name = StringField()
    area_desc = StringField()
    classification = StringField()
    classification_code = StringField()
    objectid = StringField()
    geometry = DictField()
    updatedAt = DateTimeField(default=datetime.datetime.now)


def json_to_Neighbourhoods(json_str, save: bool = False):
    documents = []
    data = json.loads(json_str)
    features = data.get('features', [])

    for feature in features:
        properties = feature.get('properties', {})
        geometry = feature.get('geometry', {})

        doc = Neighbourhoods(
            data_id=int(properties.get('_id')),
            area_id=int(properties.get('AREA_ID')),
            area_attr_id=int(properties.get('AREA_ATTR_ID')),
            parent_area_id=int(properties.get('PARENT_AREA_ID')),
            area_short_code=int(properties.get('AREA_SHORT_CODE')),
            area_long_code=int(properties.get('AREA_LONG_CODE')),
            area_name=str(properties.get('AREA_NAME')).strip(),
            area_desc=str(properties.get('AREA_DESC')).strip(),
            classification=str(properties.get('CLASSIFICATION')).strip(),
            classification_code=str(properties.get(
                'CLASSIFICATION_CODE')).strip(),
            objectid=str(properties.get('OBJECTID')).strip(),
            geometry=geometry,
        )
        documents.append(doc)
        obj_dict = {field: getattr(doc, field)
                    for field in doc._fields if field != 'id'}
        if (save):
            Neighbourhoods.objects(area_long_code=doc.area_long_code).update(upsert=True, **obj_dict)
            
    return documents



class NeighbourhoodsSerializer(DocumentSerializer):
    class Meta:
        model = Neighbourhoods
        fields = '__all__'
