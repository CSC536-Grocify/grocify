from rest_framework import serializers
from .models import Ingredient
from backend import CapitalizedCharField

class IngredientSerializer(serializers.ModelSerializer):
    name = CapitalizedCharField(max_length=120)
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'notes')