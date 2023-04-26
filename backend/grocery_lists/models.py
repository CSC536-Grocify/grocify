from django.db import models

from accounts.models import User
from measurements.models import Measurement
from ingredients.models import Ingredient

# Create your models here.
class GroceryList(models.Model):
    name = models.CharField(max_length=120)
    notes = models.TextField(null=True)
    quantity = models.FloatField(null=True)
    measurement = models.ForeignKey(Measurement, on_delete=models.CASCADE, null=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    categories = models.ManyToManyField('categories.Category', through='grocery_list_category.GroceryListCategory', related_name='grocery_lists')

    def _str_(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(GroceryList, self).save(*args, **kwargs)
