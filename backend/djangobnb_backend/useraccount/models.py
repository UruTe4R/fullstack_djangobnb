import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
  def _create_user(self, name, email, password, **extra_fields):
    if not email:
        raise ValueError("The Email field must be set.")
    if not name:
        raise ValueError("The Name field must be set.")
    if not password:
        raise ValueError("The Password field must be set.")

    email = self.normalize_email(email)
    user = self.model(email=email, name=name, **extra_fields)
    user.set_password(password)
    user.save()

    return user
  
  def create_user(self, name=None, email=None, password=None, **extra_fields):
    # set is_staff and is_superuser to false when creating a user
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(name, email, password, **extra_fields)
  
  def create_superuser(self, name=None, email=None, password=None, **extra_fields):
    # set is_staff and is_superuser to false when creating a user
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)

    if not extra_fields.get('is_staff'):
      raise ValueError("Superuser must have is_staff=True.")
    if not extra_fields.get('is_superuser'):
      raise ValueError("Superuser must have is_superuser=True.")
    
    return self._create_user(name, email, password, **extra_fields)
  
class User(AbstractBaseUser, PermissionsMixin):
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   email = models.EmailField(unique=True)
   name = models.CharField(max_length=255, null=True, blank=True)
   avatar = models.ImageField(upload_to='uploads/avatars')

   id_active = models.BooleanField(default=True)
   is_staff = models.BooleanField(default=False)

   date_joined = models.DateTimeField(auto_now_add=True)
   last_login = models.DateTimeField(blank=True, null=True)

   objects = CustomUserManager()

   USERNAME_FIELD = 'email'
   EMAIL_FIELD = 'email'
   REQUIRED_FIELDS = ['name',]