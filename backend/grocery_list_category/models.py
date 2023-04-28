from django.db import models

from accounts.models import User
from categories.models import Category
from grocery_lists.models import GroceryList

# Create your models here.
class GroceryListCategory(models.Model):
    grocery_list = models.ForeignKey(GroceryList, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.grocery_list.name + ' - ' +  self.category.name