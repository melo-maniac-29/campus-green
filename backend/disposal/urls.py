from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('', views.login_view, name='login'),
    path('upload/',views.scan_waste,name='home'),
    path('scan_qr_code/',views.scan_qr_code,name='scan_qr'),
    path('confirm/', views.confirm_page, name='confirm_page'),
]