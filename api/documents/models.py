from django.db import models

# Create your models here.
class Document(models.Model):
    type = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    position = models.IntegerField()
    image_url = models.URLField(null=True, blank=True, default=None)

    def __str__(self):
        return self.title