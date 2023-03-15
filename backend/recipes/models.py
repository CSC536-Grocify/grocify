from django.db import models

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    source = models.TextField()
    cuisine = models.CharField(max_length=120)
    prepTime = models.TextField()
    cookTime = models.TextField()

    def _str_(self):
        return self.title