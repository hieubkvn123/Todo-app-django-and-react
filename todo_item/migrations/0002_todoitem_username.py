# Generated by Django 3.2.7 on 2021-10-31 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_item', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='username',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
    ]
