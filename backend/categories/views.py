from django.shortcuts import render
from .serializers import CategorySerializer
from .models import Category
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET']) 
def getCategories(request):
    try:
        category = Category.objects.filter(user=request.user)
        serializer = CategorySerializer(category, many=True)
        response = {"data": serializer.data, "message": "Categories loaded successfully."}
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Categories loading issues."}
        return Response(data=response, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def createCategory(request):
    try:
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            response = {"data": serializer.data, "message": "Category created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": [], "message": "Category creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": "Category creation issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def updateCategory(request):
    try:
        category = Category.objects.get(id=request.data['id'], user=request.user)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Category updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": [], "message": "Category update issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": str(e), "message": "Category update issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def deleteCategory(request):
    try:
        category = Category.objects.get(id=request.data['id'], user=request.user)
        serializer = CategorySerializer(category)
        response = {"data": serializer.data, "message": "Category deleted successfully."}
        category.delete()
        return Response(data=response, status=status.HTTP_200_OK)
    except Exception as e:
        response = {"data": str(e), "message": "Category delete issues."}
        return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    