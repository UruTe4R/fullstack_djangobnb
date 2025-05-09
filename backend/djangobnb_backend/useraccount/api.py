from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status

from .serializers import UserDetailSerializer
from .models import User
from property.serializers import ReservationListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, landlord_pk):
  landlord = User.objects.get(pk=landlord_pk)

  serializer = UserDetailSerializer(landlord, many=False)

  print("landlord", landlord)
  print("serializer.data", serializer.data)
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def reservations_list(request):
  reservations = request.user.reservations.all().order_by('-booked_at')
  serializer = ReservationListSerializer(reservations, many=True)

  return Response(serializer.data, status=status.HTTP_200_OK)