from django.db import models

# Create your models here.
class User(models.Model):
    uname = models.CharField(max_length=120)
    uemail = models.TextField()

    def _str_(self):
        return self.uname