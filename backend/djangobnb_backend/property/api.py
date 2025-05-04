from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response 
from rest_framework import status

from .forms import PropertyForm
from .models import Property
from .serializers import PropertiesListSerializer, PropertiesDetailSerializer, ReservationSerializer

@api_view(['GET'])
@authentication_classes([]) # tells drf to ignore authentication, jwtなしのゲストとして使えるrouteということ。
@permission_classes([]) # tells drf to ignore permission
def properties_list(request):
  properties = Property.objects.all()
  serializer = PropertiesListSerializer(properties, many=True)

  return JsonResponse({
    'data': serializer.data
  })

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request, pk):
  property = Property.objects.get(pk=pk)

  serializer = PropertiesDetailSerializer(property, many=False)

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
  except Property.DoesNotExist:
    return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
  
  serializer = ReservationSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save(property_obj=property, booked_by=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  else:
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  