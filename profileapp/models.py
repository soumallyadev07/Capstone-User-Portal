from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(default= 'John Doe(Default)', max_length=200, null=True)

    title = models.CharField(default='This is Default Title, change it in Profile', max_length=200, null=True)

    push_bullet_token = models.CharField(default='o.JsMKS1USzCeaD968mv6oqoV0UVWWgNFl', max_length=400, null=True)

    profile_img = models.ImageField(default = 'media/default.jpg', upload_to = 'media', null = True, blank = True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

