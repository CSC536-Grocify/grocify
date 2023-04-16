# Generated by Django 4.1.7 on 2023-04-13 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipe_description'),
        ('recipe_ingredients', '0001_initial'),
        ('ingredients', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='recipes',
            field=models.ManyToManyField(through='recipe_ingredients.RecipeIngredient', to='recipes.recipe'),
        ),
    ]
