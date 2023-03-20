# from django.contrib import admin
# from django.urls import path, include

# from rest_framework_simplejwt import views as jwt_views

# urlpatterns = [
#     # path('admin/', admin.site.urls),
#     path('', include('api.urls')),
#     path('api/token/', jwt_views.TokenObtainPairView.as_view(),  name ='token_obtain_pair'),
#     path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
# ]

from django.urls import path

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
]
