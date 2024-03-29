# Generated by Django 4.1.7 on 2023-04-23 07:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ingredients", "0004_alter_ingredient_name"),
        ("ingredient_categories", "0001_initial"),
        ("categories", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="ingredient",
            field=models.ManyToManyField(
                through="ingredient_categories.IngredientCategory",
                to="ingredients.ingredient",
            ),
        ),
    ]
