from django.db import models

# Create your models here.
class Measurement(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Measurement, self).save(*args, **kwargs)

    class Meta:
        ordering = ['name']
        unique_together = ['name']