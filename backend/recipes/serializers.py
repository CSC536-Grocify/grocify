from rest_framework import serializers
from .models import Recipe
from ingredients.serializers import IngredientSerializer
from backend import CapitalizedCharField

class RecipeSerializer(serializers.ModelSerializer):
    title = CapitalizedCharField(max_length=120)
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'ingredients']

    def get_ingredients(self, obj):
        ingredients = obj.ingredients.all()
        return IngredientSerializer(ingredients, many=True).data