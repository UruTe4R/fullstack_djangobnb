from django.urls import path

from .views import fees_list

urlpatterns = [
  path('fees/', fees_list, name='api_list_fees'),
]