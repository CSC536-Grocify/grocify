from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from recipes import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('recipes', views.getRecipes)
]
