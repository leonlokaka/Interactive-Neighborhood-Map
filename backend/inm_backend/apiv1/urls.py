"""
URL configuration for inm_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = format_suffix_patterns([
    path('neighbourhood_crime_rates_yearly_stat', views.neighbourhood_crime_rates_yearly_stat, name="neighbourhood_crime_rates_yearly_stat"),
    path('neighbourhood_crime_rates_year_range', views.neighbourhood_crime_rates_year_range, name="neighbourhood_crime_rates_year_range"),
    path('neighbourhoods_geometry', views.neighbourhoods_geometry, name="neighbourhoods_geometry"),
    path('neighbourhoods_data', views.neighbourhoods_data, name="neighbourhoods_data"),
]
)
