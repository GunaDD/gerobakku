from django.shortcuts import render, redirect
from .models import Vendor
from .forms import VendorForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .forms import VendorRegistrationForm
# Create your views here.

def index(request):
    return render(request, 'index.html')

def map(request):
    print(len(Vendor.objects.all()))
    return render(request, 'map.html', {'vendors': Vendor.objects.all()})

def vendor_detail(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    return render(request, 'vendor_detail.html', {'vendor': vendor})


def vendor_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)

            try:
                vendor = Vendor.objects.get(owner=user)
                vendor.latitude = request.POST.get('latitude')
                vendor.longitude = request.POST.get('longitude')
                vendor.save()
            except Vendor.DoesNotExist:
                pass

            # get the vendor id
            return redirect('map')  # or wherever you want to redirect after login
    return render(request, 'vendor_login.html')


def vendor_register(request):
    if request.method == 'POST':
        form = VendorRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            # Create user
            user = form.save()

            # Create associated vendor
            Vendor.objects.create(
                name=form.cleaned_data['vendor_name'],
                description=form.cleaned_data['description'],
                latitude=0,  # Default values
                longitude=0,
                image=form.cleaned_data['image']
            )
            
            # Log user in
            login(request, user)
            return redirect('map')
    else:
        form = VendorRegistrationForm()
    return render(request, 'vendor_register.html', {'form': form})

def vendor_update(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    return render(request, 'vendor_update.html', {'vendor': vendor})

def vendor_delete(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)
    vendor.delete()
    return redirect('vendor_list')