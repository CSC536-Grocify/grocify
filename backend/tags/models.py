from django.db import models
from django.contrib.auth.models import User
from accounts.models import User


# Create your models here.
class Tags(models.Model):
    name = models.CharField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.title
    