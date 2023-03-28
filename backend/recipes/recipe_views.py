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

@api_view(['POST'])
def createRecipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateRecipe(request, pk):
    recipe = Recipe.objects.get(id=pk)
    serializer = RecipeSerializer(instance=recipe, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteRecipe(request, pk):
    recipe = Recipe.objects.get(id=pk)
    recipe.delete()
    return Response('Recipe successfully deleted')
