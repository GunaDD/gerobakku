from django.contrib import admin
from django.urls import path, include 
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('map/', views.map, name='map'),

    path('vendor/<int:vendor_id>/', views.vendor_detail, name='vendor_detail'),

    # Vendor CRUD
    path('vendor/login/', views.vendor_login, name='vendor_login'),
    path('vendor/register/', views.vendor_register, name='vendor_register'),
    path('vendor/<int:vendor_id>/update/', views.vendor_update, name='vendor_update'),
    path('vendor/<int:vendor_id>/delete/', views.vendor_delete, name='vendor_delete'),
] 