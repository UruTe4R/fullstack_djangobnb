from django.contrib import admin

# Register your models here.

from .models import User

class UserAdmin(admin.ModelAdmin):
  list_display = ('email', 'name', 'id_active', 'is_staff', 'date_joined', 'last_login')

admin.site.register(User, UserAdmin)