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
  number_of_nights = serializers.SerializerMethodField()
  total_price = serializers.SerializerMethodField()
  class Meta:
    model = Reservation
    fields = '__all__'
    # read_only_fieldsにするとフロントエンドからデータを貰わなくて済む。
    read_only_fields = ['total_price', 'number_of_nights', 'booked_at', 'booked_by', 'property_obj']
  
  def get_number_of_nights(self, obj):
    return obj.number_of_nights

  def get_total_price(self, obj):
    return obj.total_price
