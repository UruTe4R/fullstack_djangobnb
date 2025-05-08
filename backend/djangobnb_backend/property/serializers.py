from rest_framework import serializers
from .models import Property, Reservation
from useraccount.serializers import UserDetailSerializer

class PropertiesListSerializer(serializers.ModelSerializer):
  is_liked = serializers.SerializerMethodField()
  class Meta:
    model = Property
    fields = [
      'id',
      'title',
      'price_per_night',
      'image_url',
      'is_liked'
    ]
  def get_is_liked(self, obj):
    request = self.context.get('request')
    if request is None:
      return False
    user = request.user
    if user.is_authenticated:
      return obj.liked_by.filter(pk=user.pk).exists()
    return False


class PropertiesDetailSerializer(serializers.ModelSerializer):
  landlord = UserDetailSerializer(read_only=True, many=False)
  is_liked = serializers.SerializerMethodField()
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
      'is_liked',
    ]

  def get_is_liked(self, obj):
    request = self.context.get('request')
    if request is None:
      return False
    user = request.user
    if user.is_authenticated:
      return obj.liked_by.filter(pk=user.pk).exists()
    return False



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

class ReservationListSerializer(serializers.ModelSerializer):
  # this will make possible to get property_obj serialzied
  property_obj = PropertiesListSerializer(read_only=True, many=False)

  class Meta:
    model = Reservation
    fields = [
      'id',
      'property_obj',
      'checkin_date',
      'checkout_date',
      'total_price',
      'number_of_nights',
    ]