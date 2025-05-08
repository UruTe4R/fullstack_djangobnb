from django.urls import path

from . import api

urlpatterns = [
  path('', api.conversations_list, name='api_conversations_list'),
  path('create_conversation/<uuid:user_id>/', api.create_conversation, name='api_create_conversation'),
]