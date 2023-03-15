from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecipeSerializer
from .models import Recipe
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def getRecipes(request):
    user = Recipe.objects.all()
    serializer = RecipeSerializer(user, many=True)
    return Response(serializer.data)
