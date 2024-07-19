from django.urls import path
from .views import ImageUploadView


urlpatterns = [
    # path("", views.index, name = 'index'),
    path('upload/',ImageUploadView.as_view(), name='upload-image'),
]