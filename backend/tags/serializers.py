from rest_framework import serializers
from .models import Tags
from recipes.serializers import RecipeSerializer
from backend import CapitalizedCharField

class TagsSerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)
    recipes = serializers.SerializerMethodField()

    class Meta:
        model = Tags
        fields = ['id', 'name', 'recipes']

    def get_recipes(self, obj):
        recipes = obj.recipes.all()
        return RecipeSerializer(recipes, many=True).data
        