from rest_framework import serializers
from .models import Fees

class FeesSerializer(serializers.Serializer):
  class Meta:
    model = Fees
    fields = ['name', 'value']