from django.db import models

from accounts.models import User

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=120)
    notes = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.name