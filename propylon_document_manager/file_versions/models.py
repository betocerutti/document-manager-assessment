import re, os
from typing import Any

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_path(value):
    """
    Validate the path format, it must start with '/' and 
    end with file extension
    Some examples:
        /path/to/file.txt
        /images/photo.jpg
        /documents/report.pdf
    """
    pattern = r'^\/.*\.[a-zA-Z0-9]+$'
    message = _(
        '''Invalid path format. It must start with \'/\' and end with file extension (any)''')
    if not re.match(pattern, value):
        raise ValidationError(message)

    
# class FileProfile(models.Model):
#     name = models.fields.CharField(max_length=512, 
#                                    validators=[validate_path])
#     created_at = models.DateTimeField(auto_now_add=True)
#     owner = models.ForeignKey('users.User',on_delete=models.CASCADE)

    
#     def __str__(self):
#         return self.name
    

#     class Meta:
#         ordering = ('name',)
#         verbose_name = 'File Profile'


class FileVersion(models.Model):
    file_name = models.fields.CharField(max_length=512, 
                                        validators=[validate_path])
    version_number = models.fields.IntegerField()
    file = models.FileField(upload_to='files/', blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    content_hash = models.TextField(unique=True)
    owner = models.ForeignKey('users.User',on_delete=models.CASCADE)

    
    def __str__(self):
        return self.file_name + ' v' + str(self.version_number)
    

    class Meta:
        ordering = ('file_name', 'version_number',)
        unique_together = ('content_hash', 'version_number',)
        verbose_name = 'File Version'
     

