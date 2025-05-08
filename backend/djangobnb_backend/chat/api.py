from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status

from .models import Conversation, Message
from useraccount.models import User
from property.models import Property
from .serializers import ConversationListSerializer, ConversationCreateSerializer


@api_view(['GET'])
def conversations_list(request):
  """List all conversations for the current user."""
  serializer = ConversationListSerializer(request.user.conversations.all(), many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_conversation(request, user_id):
    """user_id is the receiver's id"""

    property_id = request.query_params.get('property_id')
    print("property_id", property_id)

    try:
        otherUser = User.objects.get(id=user_id)
        print("user_id", user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Start basic serializer instantiation with only data
    serializer = ConversationCreateSerializer(data=request.data)

    if serializer.is_valid():
        print('serializer was valid')
        # Attach optional property if exists
        property_instance = None
        if property_id:
            try:
                property_instance = Property.objects.get(id=property_id)
            except Property.DoesNotExist:
                return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

        # Save conversation
        conversation = serializer.save()

        # Ensure only 2 users are added
        conversation.users.set([request.user, otherUser])

        # Add property if present
        if property_instance:
            print("property_instance", property_instance)
            conversation.property = property_instance
            conversation.save()

        # Validate after setting the users
        if conversation.users.count() != 2:
            conversation.delete()  # Optionally, delete invalid conversation if necessary
            return Response({"error": "A conversation can only have two users"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"data": ConversationCreateSerializer(conversation).data}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

