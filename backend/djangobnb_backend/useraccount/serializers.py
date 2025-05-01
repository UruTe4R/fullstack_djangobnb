# # useraccount/serializers.py
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.db import transaction
from .models import User

class CustomRegisterSerializer(RegisterSerializer):
    # username フィールドは定義しない
    username = None
    email = serializers.EmailField(required=True)
    name  = serializers.CharField(required=False)
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    @transaction.atomic
    def save(self, request):
        # super().save() は内部で User インスタンスを作るので利用
        user = super().save(request)
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'name', 'avatar_url']

    def get_avatar_url(self, obj):
        return obj.avatar_url()