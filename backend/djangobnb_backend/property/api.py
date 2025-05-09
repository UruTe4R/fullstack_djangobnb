from django.http import JsonResponse
from django.db import transaction

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.permissions import AllowAny

from .forms import PropertyForm
from .models import Property, LikeProperty
from .serializers import PropertiesListSerializer, PropertiesDetailSerializer, ReservationSerializer, ReservationListSerializer
from .tasks import test_celery

@api_view(['GET'])
# @authentication_classes([]) # tells drf to ignore authentication, jwtなしのゲストとして使えるrouteということ。
@permission_classes([AllowAny]) # tells drf to ignore permission
def properties_list(request):
  properties = Property.objects.all()
  landlord_id = request.query_params.get('landlord_id')
  liked = request.query_params.get('liked')

  if landlord_id:
    print('landlord_id', landlord_id)
    properties = Property.objects.filter(landlord_id=landlord_id)
  if liked:
    print('liked', liked)
    properties = Property.objects.filter(liked_by=request.user)
  serializer = PropertiesListSerializer(properties, many=True, context={'request': request})

  return Response({"data": serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([])
def properties_detail(request, pk):
  property = Property.objects.get(pk=pk)

  serializer = PropertiesDetailSerializer(property, many=False, context={'request': request})

  print("serializer.data", serializer.data)

  return JsonResponse(serializer.data)


@api_view(['POST'])
def create_property(request):
  print("request.POST", request.POST)
  print("request.FILES", request.FILES)
  form = PropertyForm(request.POST, request.FILES)

  if form.is_valid():
    property = form.save(commit=False)
    property.landlord = request.user
    property.save()

    return JsonResponse({'success': True})
  else:
    print('error', form.errors, form.non_field_errors)
    return JsonResponse({'errors': form.errors}, status=400)
  
@api_view(['POST'])
def book_property(request, property_pk):
  # find the property being reserved
  try:
    property = Property.objects.get(pk=property_pk)
    print("property", property)
  except Property.DoesNotExist:
    return Response({"success": False, 'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
  
  print("request.data", request.data)
  serializer = ReservationSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(property_obj=property, booked_by=request.user)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
  else:
    return Response({"success": False, "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([])
def property_reservations(request, property_pk):
  # find the property and get all of its reservations
  property = Property.objects.get(pk=property_pk)
  reservations = property.reservations.all()

  serializer = ReservationListSerializer(reservations, many=True)

  return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def toggle_like_property(request, property_pk):
  """
  find the property of property_pk and toggles the like of the property
  """
  try:
    prop = Property.objects.get(pk=property_pk)
  except Property.DoesNotExist:
    return Response({"success": False, 'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
  # if there is a like, delete it, if not, create it
  with transaction.atomic():
    like_property, created = LikeProperty.objects.get_or_create(user=request.user, property=prop)
    if not created:
      like_property.delete()
      return Response({"success": True, "liked": False}, status=status.HTTP_200_OK)
    return Response({"success": True, "liked": True}, status=status.HTTP_200_OK)
  