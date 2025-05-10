import json

from asgiref.sync import async_to_sync # we need this to store messages in database
from channels.generic.websocket import AsyncWebsocketConsumer

from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    # create room group
    self.room_group_name = f"chat_{self.room_name}"

    # Join room
    await self.channel_layer.group_add(
      self.room_group_name,
      self.channel_name
    )

    await self.accept()
  

  async def disconnect(self):
    # leave room
    await self.channel_layer.group_discard(
      self.room_group_name,
      self.channel_name
    )