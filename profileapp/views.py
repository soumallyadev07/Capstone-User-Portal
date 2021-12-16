from django import forms
from django.shortcuts import render, redirect

from django.http import HttpResponse

from .forms import CreateUserForm, ProfileForm
from .decorators import unauthenticated_user

from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from datetime import datetime

# Create your views here.

@login_required(login_url='login')
def index(request):
    return render(request, 'profileapp/home.html')

@login_required(login_url='login')
def profile(request):
    if(request.method == 'POST'):
        form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
        print(form)
        if(form.is_valid()):
            form.save()
            username = request.user.username
            messages.info(request, f'{username}, Profile Updated!')
            return redirect('profile')
    else:
        form = ProfileForm(instance=request.user.profile)
    

    context = {
        'form': form,
    }
    return render(request, 'profileapp/profile.html', context)


def maps(request):
    return render(request, 'profileapp/maps.html')


@unauthenticated_user
def login_user(request):
    form = CreateUserForm()

    if(request.method == 'POST'):
        if('loginform' in request.POST):
            username = request.POST.get('username2')
            password = request.POST.get('password2')

            user = authenticate(request, username=username, password=password)

            if(user is not None):
                login(request, user)
                messages.info(request, f'{username}, Welcome!')
                return redirect("/")
            else:
                messages.info(request, 'Invalid Username/Password')
                return redirect('login')
        elif('signupform' in request.POST):
            form = CreateUserForm(request.POST)
            if(form.is_valid()):
                form.save()
                messages.info(request, 'Account Created')
                return redirect('login')
            else:
                context = {'form':form}
                return render(request, 'profileapp/signup.html', context)


    context = {'form':form}
    return render(request, 'profileapp/login.html', context)

@unauthenticated_user
def register_user(request):
    form = CreateUserForm()

    if(request.method == 'POST'):
        if('loginform' in request.POST):
            username = request.POST.get('username2')
            password = request.POST.get('password2')

            user = authenticate(request, username=username, password=password)

            if(user is not None):
                login(request, user)
                messages.info(request, f'{username}, Welcome!')
                return redirect("/")
            else:
                messages.info(request, 'Invalid Username/Password')
                return redirect('login')
        elif('signupform' in request.POST):
            form = CreateUserForm(request.POST)
            if(form.is_valid()):
                form.save()
                messages.info(request, 'Account Created')
                return redirect('login')
            else:
                context = {'form':form}
                return render(request, 'profileapp/signup.html', context)


    context = {'form':form}
    return render(request, 'profileapp/signup.html', context)

@login_required(login_url='login')
def logout_user(request):
    logout(request)
    return redirect('login')

