from django.db import models

# Create your models here.

class Image(models.Model):
    upload = models.FileField(upload_to = 'upload_img/')

