import hashlib

from django.shortcuts import render

from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.authtoken.models import Token

from file_versions.models import FileVersion
from .serializers import FileVersionSerializer

class FileVersionViewSet(ModelViewSet):
    authentication_classes = []
    permission_classes = []
    serializer_class = FileVersionSerializer
    queryset = FileVersion.objects.all()
    lookup_field = "id"

    def perform_create(self, serializer):
        content_hash = self.get_content_hash(serializer.validated_data['file'])
        user = self.get_user_from_token(self)
        serializer.save(uploaded_by=user, content_hash=content_hash)

    @staticmethod
    def get_user_from_token(self):
        """
        Get the user from the token
        """
        token = self.request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        return Token.objects.get(key=token).user


    @staticmethod
    def get_content_hash(file):
        """
        Calculate the SHA256 hash of the file content
        :param file: file object"""
        sha256 = hashlib.sha256()
        for chunk in file.chunks():
            sha256.update(chunk)
        return sha256.hexdigest()