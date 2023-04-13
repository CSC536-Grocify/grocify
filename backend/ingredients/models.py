from django.db import models

from accounts.models import User
from recipes.models import Recipe

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=120)
    notes = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipes = models.ManyToManyField(Recipe, through='recipe_ingredients.RecipeIngredient')

    def _str_(self):
        return self.name