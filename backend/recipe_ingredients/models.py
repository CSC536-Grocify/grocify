from django.db import models

from accounts.models import User
from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Recipe

# Create your models here.
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField(null=True)
    measurement = models.ForeignKey(Measurement, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.recipe.title + ' - ' + self.ingredient.name