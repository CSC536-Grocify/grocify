from django.urls import path
from recipes import views as recipe_views
from accounts import views as accounts_views
from ingredients import views as ingredients_views
from tags import views as tags_views
from grocery_lists import views as grocery_list_views
from categories import views as category_views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
  
urlpatterns = [
    path("signup/", accounts_views.SignUpView.as_view(), name="signup"),
    path("login/", accounts_views.LoginView.as_view(), name="login"),
    path("jwt/create/", TokenObtainPairView.as_view(), name="jwt_create"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path('recipes/', recipe_views.getRecipes, name="get_recipes"),
    path('recipes/create/', recipe_views.createRecipe, name="create_recipe"),
    path('recipes/update/', recipe_views.updateRecipe, name="update_recipe"),
    path('recipes/delete/', recipe_views.deleteRecipe, name="delete_recipe"),
    path('ingredients/', ingredients_views.getIngredients, name="get_ingredients"),
    path('ingredients/create/', ingredients_views.createIngredient, name="create_ingredient"),
    path('ingredients/update/', ingredients_views.updateIngredient, name="update_ingredient"),
    path('ingredients/delete/', ingredients_views.deleteIngredient, name="delete_ingredient"),
    path('tags/create/', tags_views.createTags, name="create_tag"),
    path('tags/delete/', tags_views.deleteTags, name="delete_tags"),
    path('tags/update/', tags_views.updateTags, name="update_tags"),
    path('tags/', tags_views.getTages, name="get_tags"),
    path('grocery-lists/make/', grocery_list_views.makeGroceryList, name="create_grocery_list"),
    path('grocery-lists/add/', grocery_list_views.addGroceryListItem, name="add_grocery_list_item"),
    path('grocery-lists/delete/', grocery_list_views.deleteGroceryListItem, name="delete_grocery_list_item"),
    path('grocery-lists/', grocery_list_views.getGroceryLists, name="get_grocery_lists"),
    path('grocery-lists/update/', grocery_list_views.updateGroceryListItem, name="update_grocery_list_item"),
    path('grocery-lists/delete-all/', grocery_list_views.deleteGroceryListItems, name="delete_all_grocery_list_items"), 
    path('categories/', category_views.getCategories, name="get_categories"),
    path('categories/create/', category_views.createCategory, name="create_category"),
    path('categories/update/', category_views.updateCategory, name="update_category"),
    path('categories/delete/', category_views.deleteCategory, name="delete_category"),

]
