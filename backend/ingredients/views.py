from django.shortcuts import render
from .serializers import IngredientSerializer
from .models import Ingredient
from categories.models import Category
from ingredient_categories.models import IngredientCategory
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
        response = {"data": str(e), "message": "Ingredients loading issues."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def createIngredient(request):
    try:
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            ingredient = serializer.save(user=request.user)

            # Get the list of category IDs from the request data
            
            category_ids_str = request.data.get('category_ids', '')
            category_ids = list(map(int, category_ids_str.split(','))) if category_ids_str else []

            # Create ingredien_categories objects for each category ID
            for category_id in category_ids:
                ingredient_category = IngredientCategory(ingredient=ingredient, category_id=category_id, user=request.user)
                ingredient_category.save()

            response = {"data": serializer.data, "message": "Ingredient created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": [], "message": "Ingredient creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": "Ingredient creation issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def updateIngredient(request):
    try:
        ingredient = Ingredient.objects.get(id=request.data['id'], user=request.user)

        category_ids_str = request.data.get('category_ids', '')
        if category_ids_str is not None and category_ids_str != '':
            # Clear existing recipe_ingredients associations
            IngredientCategory.objects.filter(ingredient=ingredient).delete()

            # Create new recipe_ingredients associations based on the ingredient_ids in the request data
            category_ids = list(map(int, category_ids_str.split(','))) if category_ids_str else []

            for category_id in category_ids:
                category = Category.objects.get(id=category_id)
                IngredientCategory.objects.create(ingredient=ingredient, category=category, user=request.user)
        else:
            # Clear existing recipe_ingredients associations
            IngredientCategory.objects.filter(ingredient=ingredient).delete()

        serializer = IngredientSerializer(ingredient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Ingredient updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": [], "message": "Ingredient update issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": "Ingredient update issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def deleteIngredient(request):
    try:
        ingredient = Ingredient.objects.get(id=request.data['id'], user=request.user)
        serializer = IngredientSerializer(ingredient)
        response = {"data": serializer.data, "message": "Ingredient deleted successfully."}
        ingredient.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Ingredient delete issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)