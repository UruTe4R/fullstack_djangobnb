from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status

from .models import Conversation, Message
from .serializers import ConversationListSerializer


@api_view(['GET'])
def conversations_list(request):
  """List all conversations for the current user."""
  serializer = ConversationListSerializer(request.user.conversations.all(), many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)