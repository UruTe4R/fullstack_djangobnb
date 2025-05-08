import uuid

from django.db import models
from django.core.exceptions import ValidationError

from useraccount.models import User
from property.models import Property

class Conversation(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  users = models.ManyToManyField(User, related_name='conversations')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  property = models.ForeignKey(Property, null=True, blank=True, related_name='conversations', on_delete=models.CASCADE)



class Message(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
  body = models.TextField()
  receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
  sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['created_at']
  
  def clean(self):
    users_in_conversation = self.conversation.users.all()

    if self.sender not in users_in_conversation or self.receiver not in users_in_conversation:
      raise ValidationError('Sender or receiver not in conversation')
  
  def save(self, *args, **kwargs):
    self.full_clean()
    super().save(*args, **kwargs)