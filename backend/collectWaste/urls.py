from django.urls import path
from . import views

urlpatterns = [
    path('collect-list/', views.collect_list, name='report_list'),
    path('upload_cleaning_proof/<int:report_id>/', views.upload_cleaning_proof, name='upload_cleaning_proof'),
    path('verification_result/<int:proof_id>/', views.verification_result, name='verification_result'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),

]