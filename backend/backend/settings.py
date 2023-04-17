"""
Django settings for backend project.
Generated by 'django-admin startproject' using Django 4.1.7.
For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
from dotenv import load_dotenv, find_dotenv
from os import getenv, environ
from datetime import timedelta

IS_PRODUCTION = False
env = environ.get("ENV", "dev")
if env == "prod":
    IS_PRODUCTION = True

# Load environment variables from the .env file
dotenv_file = ".env"
if IS_PRODUCTION:
    dotenv_file = ".env.prod"

load_dotenv(find_dotenv(dotenv_file))

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)+zew-&x^gj8t(seq!yd%s8&y-a+)cnb)g3gub6#zvezoieltd'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = not IS_PRODUCTION

if IS_PRODUCTION:
    ALLOWED_HOSTS = [
        "backend-omtljfrdga-uw.a.run.app"
    ]
else:
    ALLOWED_HOSTS = [
        'localhost',
        '127.0.0.1',
        '*'
    ]


# Application definition

INSTALLED_APPS = [
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'accounts',
    'rest_framework.authtoken',
    'recipes',
    'ingredients',
    'measurements',
    'recipe_ingredients',
    'tags',
    'recipe_tags'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

if IS_PRODUCTION:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': getenv("GCLOUD_POSTGRES_DB"),
            'USER': getenv("GCLOUD_POSTGRES_USER"),
            'PASSWORD': getenv("GCLOUD_POSTGRES_PASSWORD"),
            'HOST': getenv("GCLOUD_POSTGRES_HOST"),
            'PORT': getenv("GCLOUD_POSTGRES_PORT"),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': getenv("POSTGRES_DB"),
            'USER': getenv("POSTGRES_USER"),
            'PASSWORD': getenv("POSTGRES_PASSWORD"),
            'HOST': getenv("POSTGRES_HOST"),
            'PORT': getenv("POSTGRES_PORT"),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000'
]
if IS_PRODUCTION:
    CORS_ALLOWED_ORIGINS = [
        'https://frontend-omtljfrdga-uw.a.run.app'
    ]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}

AUTH_USER_MODEL = "accounts.User"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=20),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
