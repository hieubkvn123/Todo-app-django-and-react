# Generated by Django 3.2.7 on 2021-10-31 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_item', '0002_todoitem_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='due_date',
            field=models.DateTimeField(),
        ),
    ]