# Generated by Django 4.1.9 on 2023-08-03 10:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("file_versions", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="fileversion",
            name="file",
            field=models.FilePathField(default=None, path="media"),
            preserve_default=False,
        ),
    ]
