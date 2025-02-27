# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import WasteItem

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class WasteImageForm(forms.Form):
    waste_image = forms.ImageField(
        label='Select a waste image',
        help_text='Max. 5MB file size',
        widget=forms.ClearableFileInput(attrs={
            'accept': 'image/*',
            'capture': 'environment'
        })
    )

    def clean_waste_image(self):
        image = self.cleaned_data.get('waste_image')
        if image:
            if image.size > 5*1024*1024:  # 5MB limit
                raise forms.ValidationError("File size too large (max 5MB)")
            return image
        raise forms.ValidationError("Couldn't read uploaded image")