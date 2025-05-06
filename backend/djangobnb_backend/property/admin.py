from django.contrib import admin

from .models import Property, Reservation, LikeProperty
class ReservationAdmin(admin.ModelAdmin):
  list_display = ('id', 'property_obj', 'checkin_date', 'checkout_date', 'guests', 'booked_by', 'booked_at', 'total_price', 'number_of_nights')

admin.site.register(Property)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(LikeProperty)