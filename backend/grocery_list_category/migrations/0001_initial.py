# Generated by Django 4.1.7 on 2023-04-25 20:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('grocery_lists', '0002_alter_grocerylist_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('categories', '0004_category_ingredient'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroceryListCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='categories.category')),
                ('grocery_list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='grocery_lists.grocerylist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
