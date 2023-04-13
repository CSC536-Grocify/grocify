from rest_framework import serializers
from .models import Recipe
from ingredients.serializers import IngredientSerializer

class RecipeSerializer(serializers.ModelSerializer):
    # ingredients = IngredientSerializer(read_only=True, many=True)
    class Meta:
        model = Recipe
        fields = ('id', 'user_id','title', 'description')
        