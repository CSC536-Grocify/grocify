from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RecipeSerializer
from .models import Recipe
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# Create your views here.
@api_view(['GET']) 
def getRecipes(request):
    user = Recipe.objects.all()
    serializer = RecipeSerializer(user, many=True)
    return Response(serializer.data)

# @api_view(['POST'])
# def createRecipe(request):
#     print(request)
#     serializer = RecipeSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

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
