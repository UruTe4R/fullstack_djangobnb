import uuid

from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError

from useraccount.models import User
from platform_settings.models import Fees

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
  liked_by = models.ManyToManyField(User, through= "LikeProperty", related_name="liked_properties", blank=True)

  def image_url(self):
    return f'{settings.WEBSITE_URL}{self.image.url}'
  
  def __str__(self):
    return self.title
  
class LikeProperty(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  property = models.ForeignKey(Property, on_delete=models.CASCADE)
  liked_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    unique_together = ('user', 'property')

  def __str__(self):
    return f'{self.user} likes {self.property}'
  
class Reservation(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  property_obj = models.ForeignKey(Property, related_name="reservations", on_delete=models.CASCADE) # Property.reservations.all() で反対側から参照可能
  checkin_date = models.DateField()
  checkout_date = models.DateField()
  guests = models.IntegerField(default=1)
  booked_by = models.ForeignKey(User, related_name='reservations', on_delete=models.CASCADE)
  booked_at = models.DateTimeField(auto_now_add=True)
  
  # 計算で導けるプロパティはメソッドにして@propertyをつける。
  @property
  def number_of_nights(self):
    return (self.checkout_date - self.checkin_date).days
  
  @property
  def total_price(self):
    try:
        transaction_fee_percent = Fees.objects.get(name='djangobnb_transaction_fee').value
    except Fees.DoesNotExist:
        # Handle the case where the fee doesn't exist
        transaction_fee_percent = 0  # Or raise a ValidationError

    transaction_fee = self.property_obj.price_per_night * self.number_of_nights * transaction_fee_percent / 100
    return (self.property_obj.price_per_night * self.number_of_nights + transaction_fee)

  
  # override full_clean() that is called whenever a model instance is saved
  def clean(self):
    if self.checkout_date <= self.checkin_date:
      raise ValidationError("check-out date must be after check-in date")
    
  def save(self, *args, **kwargs):
    self.full_clean()
    super().save(*args, **kwargs)