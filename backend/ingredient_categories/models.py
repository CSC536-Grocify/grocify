from django.db import models

from accounts.models import User
from categories.models import Category
from ingredients.models import Ingredient

# Create your models here.
class IngredientCategory(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.ingredient.name + ' - ' +  self.category.name