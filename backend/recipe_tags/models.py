from django.db import models

from accounts.models import User
from tags.models import Tags
from recipes.models import Recipe

# Create your models here.
class RecipeTag(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tags, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.recipe.title + ' - ' + self.tag.name