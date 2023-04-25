from rest_framework import serializers
from .models import GroceryList
from backend import CapitalizedCharField
from categories.serializers import CategorySerializer

class GroceryListSerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)
    categories = serializers.SerializerMethodField(required=False)
    class Meta:
        model = GroceryList
        fields = ['id', 'name', 'notes', 'categories']

    def get_categories(self, obj):
        if obj.ingredient:
            categories = obj.ingredient.categories.all().order_by('name').distinct()
            return CategorySerializer(categories, many=True).data
        else:
            return []
