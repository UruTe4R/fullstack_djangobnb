from django.urls import path

from . import api

urlpatterns = [
  path('', api.properties_list, name='api_properties_list'),
  path('create/', api.create_property, name='api_create_property'),
  path('<uuid:pk>/', api.properties_detail, name='api_properties_detail'),
  path('<uuid:property_pk>/book/', api.book_property, name='api_book_property'),
  path('<uuid:property_pk>/reservations/', api.property_reservations, name='api_property_reservations'),
  path('<uuid:property_pk>/toggle_like/', api.toggle_like_property, name='api_toggle_like_property'),
]