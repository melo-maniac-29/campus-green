from django.urls import path
from . import views

urlpatterns = [
    path('create-report/', views.create_report, name='create_report'),
    
]