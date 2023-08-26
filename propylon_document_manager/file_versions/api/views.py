import hashlib

from django.utils.translation import gettext_lazy as _
from django.db.utils import IntegrityError

from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import serializers
from file_versions.models import FileVersion
from .serializers import FileVersionSerializer


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class FileVersionViewSet(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = FileVersionSerializer
    queryset = FileVersion.objects.all()
    lookup_field = "id"

    def get_queryset(self):
        return FileVersion.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):

        content_hash = self.get_content_hash(
            serializer.validated_data['file'])
        owner = self.get_user_from_token(self)

        serializer.save(owner=owner, 
                        content_hash=content_hash)

    @staticmethod
    def get_user_from_token(self):
        """
        Get the user from the token
        """
        token = self.request.META.get(
            'HTTP_AUTHORIZATION').split(' ')[1]
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