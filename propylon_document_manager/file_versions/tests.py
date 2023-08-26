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
    
    def test_only_authenticated_users_can_interact(self):
        """
        Test that a user that is not authenticated cannot interact with the API
        """
        response = self.client.get('/api/file_versions/')
        self.assertEqual(response.data['detail'], 
                         "Authentication credentials were not provided.")
        self.assertEqual(response.status_code, 401)
        
    def test_auth_user_can_upload_file(self):
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

    def test_auth_user_can_upload_new_file_version(self):
        """
        Test that a user can upload a new version of an existing file
        For this test, we will upload a file, then upload a new version of the file
        that is different from the first version from the hash perspective but
        has the same file name (URL) specified by the user.
        """
        file_content = b'This is the content of the file.'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 1, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)

        # download the file.
        id = response.data['id']
        response_original = self.client.get('/api/file_versions/{id}/'.format(id=id), 
                                          HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        self.assertEqual(response_original.status_code, 200)
        # make some changes to the file
        file_content = b'This is the content of the file. Version 2'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/',
                                    {'file_name': '/path/to/file.txt',
                                     'version_number': 2,
                                     'file': uploaded_file},
                                    HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        # upload a new version of the file
        file_content = b'This is the content of the file. Version 2'
        uploaded_file = SimpleUploadedFile("sample.txt", file_content)
        response = self.client.post('/api/file_versions/', 
                                    {'file_name': '/path/to/file.txt', 
                                     'version_number': 2, 
                                     'file': uploaded_file},
                                     HTTP_AUTHORIZATION=self.HTTP_AUTHORIZATION)
        
        self.assertEqual(response.status_code, 201)
        
        # check that the file has two versions
        file_versions = FileVersion.objects.filter(file_name='/path/to/file.txt')
        self.assertEqual(file_versions.count(), 2)
    
    def test_auth_user_can_only_see_their_own_files(self):
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
