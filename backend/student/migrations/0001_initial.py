# Generated by Django 3.1.1 on 2020-10-23 09:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('schools', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('surname', models.CharField(max_length=100)),
                ('log_code', models.CharField(max_length=50)),
                ('grade', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='schools.grade')),
                ('school', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='schools.school')),
                ('tutor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='students', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]