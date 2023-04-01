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
    print("Request data:", request.data)
    try:
        recipe = Recipe.objects.get(id=request.data['id'], user=request.user)
        serializer = RecipeSerializer(recipe, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Recipe updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": serializer.errors, "message": "Recipe update issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": f"Recipe update issues: {str(e)}"}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def deleteRecipe(request):
    try:
        recipe = Recipe.objects.get(id=request.data['id'], user=request.user)
        serializer = RecipeSerializer(recipe)
        response = {"data": serializer.data, "message": "Recipe deleted successfully."}
        recipe.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": [], "message": f"Recipe deletion issues: {str(e)}"}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
