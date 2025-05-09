from django import forms
from .models import Vendor
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class VendorForm(forms.ModelForm):
    class Meta:
        model = Vendor
        fields = ['name', 'description', 'latitude', 'longitude', 'image']

class VendorRegistrationForm(UserCreationForm):
    vendor_name = forms.CharField(max_length=100)
    description = forms.CharField(widget=forms.Textarea)
    image = forms.ImageField(required=False)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'vendor_name', 'description']