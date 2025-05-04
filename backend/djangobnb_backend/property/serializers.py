from rest_framework import serializers
from .models import Property, Reservation
from useraccount.serializers import UserDetailSerializer

class PropertiesListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Property
    fields = [
      'id',
      'title',
      'price_per_night',
      'image_url',
    ]

class PropertiesDetailSerializer(serializers.ModelSerializer):
  landlord = UserDetailSerializer(read_only=True, many=False)
  class Meta:
    model = Property
    fields = [
      'id',
      'title',
      'description',
      'price_per_night',
      'bedrooms',
      'bathrooms',
      'guests',
      'landlord',
      'country',
      'country_code',
      'category',
      'image_url',
    ]

class ReservationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reservation
    fields = ['property_obj', 'checkin_date', 'checkout_date', 'guests', 'booked_by']