from django.db import models
from django.contrib.auth.models import User
from accounts.models import User
from recipes.models import Recipe

# Create your models here.
class Tags(models.Model):
    name = models.CharField(max_length=120, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipes = models.ManyToManyField(Recipe, through='recipe_tags.RecipeTag')

    def _str_(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Tags, self).save(*args, **kwargs)
    