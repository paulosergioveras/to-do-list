from django.db import models

PRIORITY_CHOICES = [
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High')
]


class Todo(models.Model):
    title = models.CharField(max_length=200, verbose_name='Title')
    description = models.TextField(blank=True, null=True, verbose_name='Description')
    completed = models.BooleanField(default=False, verbose_name='Completed')
    priority = models.CharField(choices=PRIORITY_CHOICES, default='high', verbose_name='Priority')
    due_data = models.DateTimeField(blank=True, null=True, verbose_name='Due Data')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created at')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated at')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
