# Generated by Django 4.1.9 on 2023-08-03 13:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("file_versions", "0003_alter_fileversion_file"),
    ]

    operations = [
        migrations.AddField(
            model_name="fileversion",
            name="content_hash",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="fileversion",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="fileversion",
            name="uploaded_by",
            field=models.ForeignKey(
                default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
            preserve_default=False,
        ),
    ]
