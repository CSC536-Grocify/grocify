from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TagsSerializer
from .models import Tags
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
            serializer.save(user=request.user)
            response = {"data": serializer.data, "message": "Tags created successfully."}
            return Response(data=response, status=status.HTTP_201_CREATED)
        else:
            response = {"data": serializer.errors, "message": "Tags creation issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": "Tags creation issues."}
        return Response(data=response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
def updateTags(request):
    print("Request data:", request.data)
    try:
        tags = Tags.objects.get(id=request.data['id'], user=request.user)
        serializer = TagsSerializer(tags, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            response = {"data": serializer.data, "message": "Tags updated successfully."}
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            response = {"data": serializer.errors, "message": "Tags update issues."}
            return Response(data=response, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        response = {"data": [], "message": f"Tags update issues: {str(e)}"}
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
