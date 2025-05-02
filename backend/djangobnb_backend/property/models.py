import uuid

from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError

from useraccount.models import User

class Property(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  title = models.CharField(max_length=255)
  description = models.TextField()
  price_per_night = models.IntegerField()
  bedrooms = models.IntegerField()
  bathrooms = models.IntegerField()
  guests = models.IntegerField()
  country = models.CharField(max_length=255)
  country_code = models.CharField(max_length=10)
  category = models.CharField(max_length=255)
  #favorited
  image = models.ImageField(upload_to='uploads/properties')
  landlord = models.ForeignKey(User, related_name='properties', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)

  def image_url(self):
    return f'{settings.WEBSITE_URL}{self.image.url}'
  
class Reservation(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  property_obj = models.ForeignKey(Property, related_name="reservations", on_delete=models.CASCADE) # Property.reservations.all() で反対側から参照可能
  checkin_date = models.DateField()
  checkout_date = models.DateField()
  guests = models.IntegerField(default=1)
  booked_by = models.ForeignKey(User, related_name='reservations', on_delete=models.CASCADE)
  booked_at = models.DateTimeField(auto_now_add=True)
  
  @property
  def number_of_nights(self):
    return (self.checkout_date - self.checkin_date).days
  
  @property
  def total_price(self):
    return self.property.price_per_night * self.number_of_nights
  
  # override full_clean() that is called whenever a model instance is saved
  def clean(self):
    if self.checkout_date <= self.checkin_date:
      raise ValidationError("check-out date must be after check-in date")
    
  def save(self, *args, **kwargs):
    self.full_clean()
    super().save(*args, **kwargs)