from celery import shared_task
from django.utils.timezone import now
from property.models import Reservation
import time
@shared_task
def deactivate_old_reservations():
  outdated = Reservation.objects.filter(is_active=True, checkout_date__lt=now().date())
  count = outdated.count()
  outdated.update(is_active=False)
  return f"{count} reservations deactivated"

@shared_task
def test_celery():
  for i in range(1, 11):
    print(i)
    time.sleep(1)
  return "task completed"