from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TagsSerializer
from .models import Tags
from recipe_tags.models import RecipeTag, Recipe
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

@api_view(['GET']) 
def getTages(request):
    try:
        tags = Tags.objects.filter(user=request.user)
        serializer = TagsSerializer(tags, many=True)
        response = {"data": serializer.data, "message": "Tags loaded successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": [], "message": "Tags loading issues."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def createTags(request):
    try:
        serializer = TagsSerializer(data=request.data)

        if serializer.is_valid():
            tag = serializer.save(user=request.user)
           
            # Get the list of ingredient IDs from the request data
            recipe_ids_str = request.data.get('recipe_ids', '')
            recipe_ids = list(map(int, recipe_ids_str.split(','))) if recipe_ids_str else []

            # Create recipe_ingredient objects for each ingredient ID
            for recipe_id in recipe_ids:
                recipe_ingredient = RecipeTag(tag=tag, recipe_id=recipe_id, user=request.user)
                recipe_ingredient.save()
            
            # Return the response
            response = {"data": serializer.data, "message": "Tags created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        
        else:
            response = {"data": serializer.errors, "message": "Tags creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": "Tags creation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#recipe = tag
#ingredient = recipe

@api_view(['PUT'])
def updateTag(request):
    print("Request data:", request.data)
    try:
        tag_id = request.data['id']
        tag = Tags.objects.get(id=tag_id, user=request.user)

        # Clear existing recipe_ingredients associations
        RecipeTag.objects.filter(tag=tag).delete()

        # Create new recipe_ingredients associations based on the ingredient_ids in the request data
        recipe_ids_str = request.data.get('ingredient_ids', '')
        recipe_ids = list(map(int, recipe_ids_str.split(','))) if ingredient_ids_str else []

        for recipe_id in recipe_ids:
            recipe = Recipe.objects.get(id=recipe_id)
            RecipeTag.objects.create(tag=tag, recipe=recipe, user=request.user)

        serializer = TagsSerializer(tag, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Recipe updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": serializer.errors, "message": "Recipe update issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": f"Recipe update issues: {str(e)}"}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def deleteTags(request):
    try:
        tags = Tags.objects.get(id=request.data['id'], user=request.user)
        serializer = TagsSerializer(tags)
        response = {"data": serializer.data, "message": "Tags deleted successfully."}
        tags.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": [], "message": f"Tags deletion issues: {str(e)}"}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
