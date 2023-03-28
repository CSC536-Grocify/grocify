from django.urls import path
from recipes import recipe_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from accounts import views
  
urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("jwt/create/", TokenObtainPairView.as_view(), name="jwt_create"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path('recipes/', recipe_views.getRecipes, name="get_recipes"),
    path('recipes/create', recipe_views.createRecipe, name="create_recipe"),
    path('recipes/update', recipe_views.updateRecipe, name="update_recipe"),
    path('recipes/delete', recipe_views.deleteRecipe, name="delete_recipe"),
]
