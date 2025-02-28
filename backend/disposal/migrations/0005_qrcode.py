# Generated by Django 5.1.6 on 2025-02-27 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disposal', '0004_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QRCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_id', models.CharField(max_length=100, unique=True)),
                ('location', models.CharField(max_length=255)),
                ('bin_type', models.CharField(max_length=50)),
            ],
        ),
    ]
