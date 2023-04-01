from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecipeSerializer
from .models import Recipe
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

@api_view(['GET']) 
def getRecipes(request):
    try:
        recipes = Recipe.objects.filter(user=request.user)
        serializer = RecipeSerializer(recipes, many=True)
        response = {"data": serializer.data, "message": "Recipes loaded successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": [], "message": "Recipes loading issues."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createRecipe(request):
    try:
        serializer = RecipeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            response = {"data": serializer.data, "message": "Recipe created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": serializer.errors, "message": "Recipe creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": "Recipe creation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def updateRecipe(request):
    pk = request.GET.get('id', None)
    if pk is None:
        return Response({"detail": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        recipe = Recipe.objects.get(id=pk)
    except Recipe.DoesNotExist:
        return Response({"detail": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)

    data = {
        'title': request.GET.get('title', recipe.title),
        'description': request.GET.get('description', recipe.description)
    }
    
    serializer = RecipeSerializer(instance=recipe, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteRecipe(request):
    pk = request.GET.get('id', None)
    if pk is None:
        return Response({"detail": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        recipe = Recipe.objects.get(id=pk)
    except Recipe.DoesNotExist:
        return Response({"detail": "Recipe not found"}, status=status.HTTP_404_NOT_FOUND)

    recipe.delete()
    return Response('Recipe successfully deleted', status=status.HTTP_204_NO_CONTENT)
