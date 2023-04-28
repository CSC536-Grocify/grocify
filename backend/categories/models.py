from django.db import models
from django.contrib.auth.models import User
from accounts.models import User
from recipes.models import Ingredient

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ingredient = models.ManyToManyField(Ingredient, through='ingredient_categories.IngredientCategory')

    def _str_(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Category, self).save(*args, **kwargs)

    class Meta:
        ordering = ['name']
        unique_together = ['name', 'user']
    