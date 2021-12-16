from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db import models
from django.forms import widgets

from .models import Profile
from django.forms.models import ModelForm

from django.forms.widgets import FileInput


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'
        exclude = ['user']
        include = ['push_bullet_token']
        widgets = {
            'profile_img': FileInput(),
        }