from django.contrib import admin
from .models import Todo


@admin.register(Todo)
class ModelAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'completed',
        'priority',
        'due_date',
        'created_at',
        'updated_at'
    )
