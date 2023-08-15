import os

from django.test import TestCase
from django.test import Client
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.authtoken.models import Token
from factory.django import DjangoModelFactory

from file_versions.models import FileVersion
from propylon_document_manager.users.tests.factories import UserFactory


class FileVersionFactory(DjangoModelFactory):
    class Meta:
        model = FileVersion


class FileVersionTestCase(TestCase):

    def setUp(self):

        self.client = Client()
        self.user = UserFactory(email='fixed@mail.com')
        self.token = Token.objects.create(user=self.user)
        self.HTTP_AUTHORIZATION = 'Token ' + self.token.key
        
    def test_user_can_upload_file(self):
        """
        Test that a user can upload a file of any type
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)
    
    def test_user_cannot_upload_same_file_twice(self):
        """
        Test that a user cannot upload the same file twice
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)

        # try to upload the same file again
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 400)

    def test_user_cannot_upload_same_file_with_different_version_number(self):
        """
        Test that a user cannot upload the same file with a different version number
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)

        # try to upload the same file again with a different version
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 2, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 400)
        
    def test_user_cannot_interact_with_file_versions_without_authentication(self):
        """
        Test that a user cannot interact with file versions without authentication
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file})
        
        self.assertEqual(response.status_code, 401)
    
    def test_user_can_only_see_their_own_file_versions(self):
        """
        Test that a user can only see their own file versions
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)

        end_point = '/api/file_versions/{0}/'.format(response.data['id'])

        # assert that the user can see the file version they created
        response_200 = self.client.get(
            end_point,
            HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        self.assertEqual(response_200.status_code, 200)
        

        # create another user
        another_user = UserFactory(email='fixed2@mail.com')
        another_token = Token.objects.create(user=another_user)
        another_HTTP_AUTHORIZATION = 'Token ' + another_token.key

        # try to get the file version created by the first user
        response_404 = self.client.get(
            end_point,
            HTTP_AUTHORIZATION=another_HTTP_AUTHORIZATION)

        self.assertEqual(response_404.status_code, 404)

    def tearDown(self) -> None:
        # delete the file from the file system
        try:
            file = FileVersion.objects.get(file_name='/path/to/file.txt')
            os.remove(file.file.path)
        except Exception as e:
            pass

        return super().tearDown()
