from django.utils.translation import gettext_lazy as _
from django.db.utils import IntegrityError
from rest_framework import serializers

from file_versions.models import FileVersion

class FileVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileVersion
        fields = [
            'id',
            'file_name', 
            'version_number', 
            'file', 
            'owner']
        read_only_fields = [
            'id',
            'owner', 
            'content_hash']        

    def save(self, **kwargs):
        # check UniqueTogetherValidator
        try:
            super().save(**kwargs)
        except IntegrityError as e:
            raise serializers.ValidationError(
                _('The combination of file name and version number must be unique.'))
        except Exception as e:
            raise serializers.ValidationError(
                _('An error occurred while saving the file version.'))
        