# Generated by Django 4.1.9 on 2023-08-04 07:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("file_versions", "0006_alter_fileversion_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="fileversion",
            name="content_hash",
            field=models.TextField(blank=True, null=True, unique=True),
        ),
    ]
