# Generated by Django 4.1.7 on 2023-04-20 06:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ingredients", "0003_remove_ingredient_recipes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ingredient",
            name="name",
            field=models.CharField(max_length=120, unique=True),
        ),
    ]
