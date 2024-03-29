# Generated by Django 4.1.7 on 2023-04-23 07:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ingredient_categories", "0001_initial"),
        ("categories", "0004_category_ingredient"),
        ("ingredients", "0004_alter_ingredient_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="ingredient",
            name="categories",
            field=models.ManyToManyField(
                related_name="ingredients",
                through="ingredient_categories.IngredientCategory",
                to="categories.category",
            ),
        ),
    ]
