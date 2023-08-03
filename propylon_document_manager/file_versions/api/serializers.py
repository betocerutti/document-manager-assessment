from rest_framework import serializers

from file_versions.models import FileVersion

class FileVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileVersion
        fields = ['file_name', 'version_number', 'file', 'uploaded_by']
        read_only_fields = ['uploaded_by', 'content_hash']
