# Generated by Django 3.2.7 on 2021-11-04 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo_item', '0007_auto_20211031_1306'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='todoitem',
            unique_together={('username', 'title')},
        ),
    ]
