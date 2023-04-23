from rest_framework import serializers
from .models import Ingredient
from categories.serializers import CategorySerializer
from backend import CapitalizedCharField

class IngredientSerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'notes', 'categories')

    def get_categories(self, obj):
        categories = obj.categories.all()
        return CategorySerializer(categories, many=True).data