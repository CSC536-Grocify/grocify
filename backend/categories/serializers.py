from rest_framework import serializers
from .models import Category
from backend import CapitalizedCharField

class CategorySerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)

    class Meta:
        model = Category
        fields = ['id', 'name']
        
        