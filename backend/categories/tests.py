# from django.test import TestCase, Client
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase, APIClient
# from accounts.models import User
# from .models import Category
# from .serializers import CategorySerializer

# # initialize the APIClient app
# client = APIClient()

# class CategoryTests(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(
#                     email='testuser@example.com',
#                     username='testuser',
#                     password='testpass'
#                 )
#         self.category = Category.objects.create(
#             name='Test Category', user=self.user)

#     def test_get_categories(self):
#         """
#         Test the GET (all categories) endpoint
#         """
#         # Authenticate user
#         self.client.force_authenticate(user=self.user)

#         # Issue GET request
#         response = self.client.get(reverse('get_categories'))

#         # Check response status code
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # Check response data
#         categories = Category.objects.filter(user=self.user)
#         serializer = CategorySerializer(categories, many=True)
#         self.assertEqual(response.data['data'], serializer.data)

#     def test_create_category(self):
#         """
#         Test the POST (create category) endpoint
#         """
#         # Authenticate user
#         self.client.force_authenticate(user=self.user)

#         # Issue POST request
#         data = {'name': 'New Category'}
#         response = self.client.post(reverse('create_category'), data=data)

#         # Check response status code
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#         # Check response data
#         category = Category.objects.filter(user=self.user).latest('id')
#         serializer = CategorySerializer(category)
#         self.assertEqual(response.data['data'], serializer.data)

#     def test_update_category(self):
#         """
#         Test the PUT (update category) endpoint
#         """
#         # Authenticate user
#         self.client.force_authenticate(user=self.user)

#         # Issue PUT request
#         data = {'id': self.category.id, 'name': 'Updated Category'}
#         response = self.client.put(reverse('update_category'), data=data)

#         # Check response status code
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # Check response data
#         category = Category.objects.get(id=self.category.id, user=self.user)
#         serializer = CategorySerializer(category)
#         self.assertEqual(response.data['data'], serializer.data)

#     def test_delete_category(self):
#         """
#         Test the DELETE (delete category) endpoint
#         """
#         # Authenticate user
#         self.client.force_authenticate(user=self.user)

#         # Issue DELETE request
#         data = {'id': self.category.id}
#         response = self.client.delete(reverse('delete_category'), data=data)

#         # Check response status code
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         # Check response data
#         category = Category.objects.filter(id=self.category.id).first()
#         self.assertIsNone(category)
