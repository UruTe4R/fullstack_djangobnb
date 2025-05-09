from celery import shared_task
from django.utils.timezone import now
from property.models import Reservation
import time
@shared_task
def deactivate_old_reservations():
  Reservation.objects.filter(is_active=True, chekcout_date__lt=now()).update(is_active=False)

@shared_task
def test_celery():
  for i in range(1, 11):
    print(i)
    time.sleep(1)
  return "task completed"