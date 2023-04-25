# from django.test import TestCase, Client
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase, APIClient
# from accounts.models import User
# from ingredients.models import Ingredient
# from recipes.models import Recipe
# from .models import GroceryList
# from .serializers import GroceryListSerializer

# # initialize the APIClient app
# client = APIClient()

# class MakeGroceryListTests(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(
#                     email='testuser@example.com',
#                     username='testuser',
#                     password='testpass'
#                 )

#         self.recipe1 = Recipe.objects.create(
#             user=self.user,
#             title='Recipe 1',
#             description='Description for Recipe 1'
#         )

#         self.recipe2 = Recipe.objects.create(
#             user=self.user,
#             title='Recipe 2',
#             description='Description for Recipe 2'
#         )

#         self.ingredient1 = Ingredient.objects.create(
#             name='Ingredient 1',
#             notes='Notes for Ingredient 1'
#         )

#         self.ingredient2 = Ingredient.objects.create(
#             name='Ingredient 2',
#             notes='Notes for Ingredient 2'
#         )

#         self.recipe1.ingredients.add(self.ingredient1)
#         self.recipe1.ingredients.add(self.ingredient2)
#         self.recipe2.ingredients.add(self.ingredient2)

#     def test_make_grocery_list(self):
#         """
#         Test the POST (make grocery list) endpoint
#         """
#         # Authenticate user
#         self.client.force_authenticate(user=self.user)

#         # Issue POST request
#         data = {'tag_ids': ''}
#         response = self.client.post(reverse('make_grocery_list'), data=data)

#         # Check response status code
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # Check response data
#         grocery_lists = GroceryList.objects.filter(user=self.user)
#         serializer = GroceryListSerializer(grocery_lists, many=True)
#         self.assertEqual(response.data['data'], serializer.data)

#         # Check that grocery list items were created correctly
#         grocery_list_names = [grocery_list.name for grocery_list in grocery_lists]
#         self.assertIn(self.ingredient1.name.lower(), grocery_list_names)
#         self.assertIn(self.ingredient2.name.lower(), grocery_list_names)
