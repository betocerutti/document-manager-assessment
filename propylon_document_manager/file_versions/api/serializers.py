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
        
        try:
            file_version = FileVersion.objects.get(
                file_name=kwargs['content_hash'],
                owner=kwargs['owner'])
        except FileVersion.DoesNotExist:
            file_version = None
            
        if file_version:    
            # check if file content is the same
            if file_version.content_hash == kwargs['content_hash']:
                raise serializers.ValidationError(
                    _('File content is the same as the previous version.'))
            else:
                # increment version number
                self.validated_data['version_number'] = file_version.version_number + 1
                file_version = super().save(**kwargs)
        else:
            file_version = super().save(**kwargs)
        
        return file_version