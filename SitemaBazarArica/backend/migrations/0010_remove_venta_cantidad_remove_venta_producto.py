# Generated by Django 4.2.4 on 2023-12-28 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_stock_producto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venta',
            name='cantidad',
        ),
        migrations.RemoveField(
            model_name='venta',
            name='producto',
        ),
    ]
