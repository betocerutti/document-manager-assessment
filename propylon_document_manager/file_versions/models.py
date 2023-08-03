from django.db import models

class FileVersion(models.Model):
    file_name = models.fields.CharField(max_length=512)
    version_number = models.fields.IntegerField()
    file = models.FileField(upload_to='files/',blank=False,null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    content_hash = models.TextField(blank=True,null=True)
    # TODO: ask Berndan if we want to cascade delete user's file?
    uploaded_by = models.ForeignKey('users.User',on_delete=models.CASCADE)

    
    def __str__(self):
        return self.file_name + ' v' + str(self.version_number)
    
    
