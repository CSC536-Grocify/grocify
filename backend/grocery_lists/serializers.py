from rest_framework import serializers
from .models import GroceryList
from ingredients.serializers import IngredientSerializer

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = ['id', 'name', 'notes']
