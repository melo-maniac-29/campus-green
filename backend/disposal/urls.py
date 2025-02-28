from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('', views.login_view, name='login'),
    path('home/',views.home,name='home'),
    path('upload/',views.scan_waste,name='scan_waste'),
    path('scan_qr_code/',views.scan_qr_code,name='scan_qr'),
    path('confirm/', views.confirm_page, name='confirm_page'),
    path('logout/',views.logout_view,name='logout')
]