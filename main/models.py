from django.db import models

# Create your models here.

class Vendor(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to='vendors/', null=True, blank=True)

    def __str__(self):
        return self.name

