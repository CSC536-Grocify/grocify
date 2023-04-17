from django.db import models
from django.contrib.auth.models import User
from accounts.models import User
from ingredients.models import Ingredient
 
# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredients = models.ManyToManyField(Ingredient, through='recipe_ingredients.RecipeIngredient')

    def _str_(self):
        return self.title
    