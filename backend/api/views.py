from rest_framework.response import Response
from rest_framework.decorators import api_view

from users.models import User
from .serializer import UserSerializer

@api_view(['GET'])
def getData(request):
    person = {'name': 'Eric', 'age': '86'}
    return Response(person)

@api_view(['GET'])
def getUsers(request):
    user = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)