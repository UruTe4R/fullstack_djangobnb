from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status


from .models import Fees
from .serializers import FeesSerializer

# Create your views here.

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def fees_list(request):
  fees = Fees.objects.all()
  name = request.query_params.get('name')

  if name:
    print("request.query_params['name']", request.query_params['name'])
    fees = fees.filter(name=name).first()
    if fees:
      serializer = FeesSerializer(fees, many=False)
      return Response(serializer.data, status=status.HTTP_200_OK)
    
  serializer = FeesSerializer(fees, many=True)

  return Response(serializer.data, status=status.HTTP_200_OK)