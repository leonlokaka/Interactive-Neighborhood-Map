import datetime
from enum import Enum
import json
from django.contrib.auth.models import Group, User
from rest_framework import status, request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from inm_backend.models.neighbourhood_crime_rates import NeighbourhoodCrimeRates, NeighbourhoodCrimeRatesSerializer
from inm_backend.models.neighbourhoods import Neighbourhoods, NeighbourhoodsSerializer
import numpy as np


class NeighbourhoodSelectDataOptions(Enum):
    all = "all"
    neighbourhood_crime_rates = "neighbourhood_crime_rates"
    parks_and_recreation_facilities = "parks_and_recreation_facilities"


@api_view(["GET"])
def neighbourhoods_geometry(request):
    neighbourhoods = Neighbourhoods.objects.all()
    response_data = []
    for row in neighbourhoods:
        serializer = NeighbourhoodsSerializer(row)
        response_data.append(serializer.data)
    return Response(response_data)


@api_view(["GET"])
def neighbourhood_crime_rates(request):
    hood_id = int(request.GET.get("area_long_code") or 0)
    year = int(request.GET.get("year") or 0)
    matchItems = {}
    if (hood_id):
        matchItems["hood_id"] = hood_id
    if (year):
        matchItems["year"] = year
    neighbourhoods = NeighbourhoodCrimeRates.objects(**matchItems).all()
    response_data = []
    for row in neighbourhoods:
        serializer = NeighbourhoodCrimeRatesSerializer(row)
        response_data.append(serializer.data)
    return Response(response_data)


@api_view(["GET"])
def neighbourhoods_data(request):
    geometry = bool(int(request.GET.get("geometry") or 0))
    area_long_code = int(request.GET.get("area_long_code") or 0)
    year = int(request.GET.get("year") or 0)
    select_data_list: list[str] = []
    try:
        select_data_list = json.loads(
            request.GET.get("select_data_list") or 0)
    except (TypeError, json.JSONDecodeError):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    lookup_aggregations = {
        NeighbourhoodSelectDataOptions.neighbourhood_crime_rates.value: [{
            "$lookup": {
                "from": "neighbourhood_crime_rates",
                "localField": "area_long_code",
                "foreignField": "hood_id",
                "as": "neighbourhood_crime_rates",
                "pipeline": [
                    {
                        "$match": {
                            "year": year,
                        },
                    } if year else {
                        "$sort": {
                            "year": -1
                        }
                    },

                ],
            },
        }, {
            "$addFields": {
                "neighbourhood_crime_rates": {
                    "_id": {"$toString": "$_id"},
                },
            }
        }],
        NeighbourhoodSelectDataOptions.parks_and_recreation_facilities.value:
        [
            {
                "$lookup": {
                    "from": "parks_and_recreation_facilities",
                    "localField": "area_long_code",
                    "foreignField": "area_long_code",
                    "as": "parks_and_recreation_facilities",
                }
            },
            {
                "$addFields": {
                    "parks_and_recreation_facilities": {
                        "_id": {"$toString": "$_id"},
                    },
                }
            }
        ]
    }

    aggregations = [
        {
            # exclusion projection
            "$project": {
                "objectid": 0,
            } if geometry else {
                "objectid": 0,
                "geometry": 0,
            }
        },
        {
            "$addFields": {
                "_id": {"$toString": "$_id"},
            }
        }
    ]
    if (area_long_code):
        aggregations.append(
            {
                "$match":
                {
                    "area_long_code": area_long_code,
                },
            },
        )

    if (NeighbourhoodSelectDataOptions.all.value in select_data_list):
        aggregations.extend(
            np.array(list(lookup_aggregations.values())).flatten())
    elif (len(select_data_list) > 0):
        for collection in select_data_list:
            if collection in lookup_aggregations:
                aggregations.extend(list(lookup_aggregations[collection]))

    results = Neighbourhoods.objects().aggregate(aggregations)

    response_data = [row for row in results]
    return Response(response_data)


@api_view(["GET"])
def neighbourhood_crime_rates_year_range(request):
    year_range = NeighbourhoodCrimeRates.objects().aggregate(
        [
            {
                "$group": {
                    "_id": "",
                    "max_year": {
                        "$max": "$year",
                    },
                    "min_year": {
                        "$min": "$year",
                    },
                }
            },
        ])
    if year_range._has_next():
        response_data = year_range.try_next()
        return Response(response_data)
    return None


@api_view(["GET"])
def neighbourhood_crime_rates_year_options(request):
    result = NeighbourhoodCrimeRates.objects().aggregate(
        [
            {
                "$group": {
                    "_id": "$year"
                }
            },
            {
                "$sort": {
                    "_id": -1
                }
            }, {
                "$project": {
                    "_id": 0,
                    "__value": "$_id",
                    "__text": "$_id"
                }
            }
            # {
            #     "$group": {
            #         "_id": "",
            #         "__value ": {
            #             "$push": "$_id"
            #         }
            #     }
            # }, {
            #     "$project": {
            #         "_id": 0,
            #         "__value ": 1
            #     }
            # }
        ])
    # if result._has_next():
    #     response_data = result.try_next()
    #     return Response(response_data)
    # return None

    response_data = [row for row in result]
    return Response(response_data)


@api_view(["GET"])
def neighbourhood_area_options(request):
    result = Neighbourhoods.objects().aggregate(
        [
            {
                "$group": {
                    "_id": "$area_long_code",
                    "area_name": {"$first": "$area_name"}
                }
            },
            {
                "$sort": {
                    "area_name": 1
                }
            }, {
                "$project": {
                    "_id": 0,
                    "__value": "$_id",
                    "__text": "$area_name"
                }
            }
        ])
    response_data = [row for row in result]
    return Response(response_data)


@api_view(["GET"])
def neighbourhood_crime_rates_yearly_stat(request):
    year = int(request.GET.get("year") or 0)
    if year < 2014 or year > datetime.datetime.now().year:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    yearly_stat = NeighbourhoodCrimeRates.objects().aggregate(
        [
            {
                "$match": {
                    "year": year,
                }
            },
            {
                "$group": {
                    "_id": "",
                    "max_assault_rate": {
                        "$max": "$assault_rate",
                    },
                    "max_autotheft_rate": {
                        "$max": "$autotheft_rate",
                    },
                    "max_biketheft_rate": {
                        "$max": "$biketheft_rate",
                    },
                    "max_breakenter_rate": {
                        "$max": "$breakenter_rate",
                    },
                    "max_homicide_rate": {
                        "$max": "$homicide_rate",
                    },
                    "max_robbery_rate": {
                        "$max": "$robbery_rate",
                    },
                    "max_shooting_rate": {
                        "$max": "$shooting_rate",
                    },
                    "max_theftfrommv_rate": {
                        "$max": "$theftfrommv_rate",
                    },
                    "max_theftover_rate": {
                        "$max": "$theftover_rate",
                    },
                    "min_assault_rate": {
                        "$min": "$assault_rate",
                    },
                    "min_autotheft_rate": {
                        "$min": "$autotheft_rate",
                    },
                    "min_biketheft_rate": {
                        "$min": "$biketheft_rate",
                    },
                    "min_breakenter_rate": {
                        "$min": "$breakenter_rate",
                    },
                    "min_homicide_rate": {
                        "$min": "$homicide_rate",
                    },
                    "min_robbery_rate": {
                        "$min": "$robbery_rate",
                    },
                    "min_shooting_rate": {
                        "$min": "$shooting_rate",
                    },
                    "min_theftfrommv_rate": {
                        "$min": "$theftfrommv_rate",
                    },
                    "min_theftover_rate": {
                        "$min": "$theftover_rate",
                    },
                }
            }
        ]
    )

    response_data = [row for row in yearly_stat]
    return Response(response_data)
