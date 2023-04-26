from django.db import models

from accounts.models import User

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=120)
    notes = models.TextField(null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    categories = models.ManyToManyField('categories.Category', through='ingredient_categories.IngredientCategory', related_name='ingredients')

    def _str_(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Ingredient, self).save(*args, **kwargs)

    class Meta:
        ordering = ['name']
        unique_together = ['name', 'user']
