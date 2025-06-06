"""
ASGI config for djangobnb_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangobnb_backend.settings')

application = get_asgi_application()

from chat.routing import websocket_urlpatterns
from chat.token_auth import TokenAuthMiddleware

application = ProtocolTypeRouter({
  'http': get_asgi_application(),
  'websocket': TokenAuthMiddleware(
    URLRouter(
      websocket_urlpatterns
    )
  )
})
