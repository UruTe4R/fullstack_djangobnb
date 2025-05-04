from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Fees
from .serializers import FeesSerializer

# Create your views here.

@api_view(['GET'])
def fees_list(request):
  fees = Fees.objects.all()

  if request.query_params['name']:
    fees = Fees.objects.filter(name=request.query_params['name'])
    serializer = FeesSerializer(fees, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)
  serializer = FeesSerializer(fees, many=True)

  return Response(serializer.data, status=status.HTTP_200_OK)