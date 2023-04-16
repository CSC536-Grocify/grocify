from rest_framework import serializers
from .models import Recipe
from ingredients.serializers import IngredientSerializer

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'ingredients']

    def get_ingredients(self, obj):
        ingredients = obj.ingredients.all()
        return IngredientSerializer(ingredients, many=True).data