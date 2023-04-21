from rest_framework import serializers
from .models import GroceryList
from backend import CapitalizedCharField

class GroceryListSerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)

    class Meta:
        model = GroceryList
        fields = ['id', 'name', 'notes']
