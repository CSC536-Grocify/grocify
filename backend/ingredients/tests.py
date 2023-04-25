from django.contrib.auth import get_user_model
from django.test import TestCase
from ingredients.models import Ingredient
from categories.models import Category
from ingredient_categories.models import IngredientCategory

class IngredientTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass'
        )
        self.ingredient = Ingredient.objects.create(name='Apple', user=self.user, id=1)
        # self.category = Category.objects.create(name='Fruits', user=self.user)
        # self.ingredient_category = IngredientCategory.objects.create(ingredient=self.ingredient, category=self.category, user=self.user)
        # self.ingredient.categories.add(self.category)

    def test_get_ingredients(self):
        response = self.client.get('/ingredients/')
        print("---------Honey sing:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Apple')

    # def test_create_ingredient(self):
    #     response = self.client.post('/ingredients/create/', {'name': 'Banana', 'categories': [self.category.id]})
    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(Ingredient.objects.count(), 2)

    # def test_update_ingredient(self):
    #     response = self.client.patch(f'/api/ingredients/{self.ingredient.id}/', {'name': 'Green Apple'})
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(Ingredient.objects.get(id=self.ingredient.id).name, 'Green Apple')

    # def test_delete_ingredient(self):
    #     response = self.client.delete(f'/api/ingredients/{self.ingredient.id}/')
    #     self.assertEqual(response.status_code, 204)
    #     self.assertEqual(Ingredient.objects.count(), 0)
