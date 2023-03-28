from django.db import models

# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField() 
    # source = models.TextField() #get ride of this
    # cuisine = models.CharField(max_length=120) #get ride of this
    # prepTime = models.TextField() #get ride of this
    # cookTime = models.TextField() #get ride of this


    def _str_(self):
        return self.title
    