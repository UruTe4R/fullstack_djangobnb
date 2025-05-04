from django.db import models

# Create your models here.

class Fees(models.Model):
  name = models.CharField(max_length=255)
  value = models.IntegerField()