# Generated by Django 4.1.7 on 2023-04-20 06:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tags", "0003_tags_recipes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tags",
            name="name",
            field=models.CharField(max_length=120, unique=True),
        ),
    ]