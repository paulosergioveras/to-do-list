from rest_framework import serializers
from django.utils import timezone
from ..models import Todo


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'
    
    def validate_due_date(self, value):
        if value and value < timezone.now():
            raise serializers.ValidationError(
                'The due date cannot be earlier than the current date.'
            )
        return value

