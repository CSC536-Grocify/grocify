from django.shortcuts import render
from .serializers import IngredientSerializer
from .models import Ingredient
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET']) 
def getIngredients(request):
    try:
        ingredient = Ingredient.objects.filter(user=request.user)
        serializer = IngredientSerializer(ingredient, many=True)
        response = {"data": serializer.data, "message": "Ingredients loaded successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": [], "message": "Ingredients loading issues."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def createIngredient(request):
    try:
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            response = {"data": serializer.data, "message": "Ingredient created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": [], "message": "Ingredient creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": "Ingredient creation issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)