# Generated by Django 3.2.7 on 2021-10-31 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_item', '0006_auto_20211031_1305'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='id',
            field=models.BigAutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='title',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
