from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async # get data from database synchronously
from channels.middleware import BaseMiddleware # create custome middleware form BaseMiddleware
from urllib.parse import parse_qs

from rest_framework_simplejwt.tokens import AccessToken # get accesstoken from headers
# import specific errors
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


## get User model
User = get_user_model()

@database_sync_to_async
def get_user(token_key):
  try:
    token = AccessToken(token_key)
    user_id = token.payload['user_id']
    return User.objects.get(pk=user_id)
  except (TokenError, InvalidToken, KeyError, User.DoesNotExist):
    return AnonymousUser
  

class TokenAuthMiddleware(BaseMiddleware):
  def __init__(self, inner):
    self.inner = inner
  
  async def __call__(self, scope, receive, send):
    # query_string is dict of list of strings
    query_string = parse_qs(scope['query_string'].decode())

    # set the default value of token to None
    token = None

    # get token from query string or headers
    if 'token' in query_string.keys():
      token = query_string.get('token', [None])[0]
    elif 'authorization' in dict(scope['headers']):
      auth_header = dict(scope['headers']).get(b'authorization').decode()
      if auth_header.startswith('Bearer '):
        token = auth_header.split(" ")[1]


    # set scope['user] = None
    scope['user'] = None

    if token:
      scope['user'] = await get_user(token)
    else:
      scope['user'] = AnonymousUser

    
    return await super().__call__(scope, receive, send)
  
