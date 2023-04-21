from django.shortcuts import render
from rest_framework import viewsets

from .serializers import GroceryListSerializer
from .models import GroceryList
from ingredients.models import Ingredient
from recipes.models import Recipe
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def getGroceryLists(request):
    try:
        grocery_lists = GroceryList.objects.filter(user=request.user)
        serializer = GroceryListSerializer(grocery_lists, many=True)
        response = {"data": serializer.data, "message": "Grocery lists fetched successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery lists fetching issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get all the grocery lists for the user by taking tags as a parameter, fetch all recipes from all the tag id list, then fetch all the ingredients from all the recipes, then return the list of ingredients
@api_view(['POST'])
def makeGroceryList(request):
    try:
        tag_ids_str = request.data.get('tag_ids', '')
        tag_ids = list(map(int, tag_ids_str.split(','))) if tag_ids_str else []

        # Delete all existing grocery lists for the user where ingredient is not null
        # GroceryList.objects.filter(user=request.user, ingredient__isnull=False).delete()

        # Create grocery lists for each ingredient
        recipes = Recipe.objects.filter(user=request.user, tags__in=tag_ids).distinct()

        ingredients = Ingredient.objects.filter(recipeingredient__recipe__in=recipes).distinct()

        for ingredient in ingredients:
            grocery_list = GroceryList(user=request.user, ingredient=ingredient, name=ingredient.name, notes=ingredient.notes)
            grocery_list.save()

        # Return all created grocery lists as a response
        grocery_lists = GroceryList.objects.filter(user=request.user)
        serializer = GroceryListSerializer(grocery_lists, many=True)

        response = {"data": serializer.data, "message": "Grocery list created successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery list creation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def addGroceryListItem(request):
    try:
        serializer = GroceryListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            response = {"data": serializer.data, "message": "Grocery list item created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": serializer.errors, "message": "Grocery list item creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery list item creation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PUT'])
def updateGroceryListItem(request):
    try:
        grocery_list = GroceryList.objects.get(id=request.data['id'], user=request.user)
        serializer = GroceryListSerializer(grocery_list, data=request.data)

        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Grocery list item updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": serializer.errors, "message": "Grocery list item updation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except GroceryList.DoesNotExist:
        response = {"data": "Grocery list item does not exist."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery list item updation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def deleteGroceryListItem(request):
    try:
        grocery_list = GroceryList.objects.get(id=request.data['id'], user=request.user)
        serializer = GroceryListSerializer(grocery_list)
        response = {"data": serializer.data, "message": "Grocery list item deleted successfully."}
        grocery_list.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except GroceryList.DoesNotExist:
        response = {"data": "Grocery list item does not exist."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery list item deletion issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def deleteGroceryListItems(request):
    try:
        grocery_lists = GroceryList.objects.filter(user=request.user)
        serializer = GroceryListSerializer(grocery_lists, many=True)
        response = {"data": serializer.data, "message": "Grocery list items deleted successfully."}
        grocery_lists.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Grocery list items deletion issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
