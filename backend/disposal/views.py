from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Redirect to a home page after registration
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to a home page after login
        else:
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')


from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from .models import WasteItem

def scan_waste(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST' and 'waste_image' in request.FILES:
        # Get uploaded image
        uploaded_file = request.FILES['waste_image']
        
        # Mock detection (Replace with actual ML model)
        detected_type = "Plastic Bottle" if "bottle" in uploaded_file.name.lower() else "Other"
        points = 10 if detected_type == "Plastic Bottle" else 2
        bin_type = 'R' if detected_type == "Plastic Bottle" else 'L'
        
        # Create waste item record (Django handles file saving)
        waste_item = WasteItem.objects.create(
            user=request.user,
            item_type=detected_type,
            points=points,
            bin_type=bin_type,
            image=uploaded_file  # Django will automatically save the file
        )
        
        return render(request, 'result.html', {
            'item': waste_item,
            'locations': get_bin_locations(bin_type)
        })
    
    return render(request, 'scan.html')

def get_bin_locations(bin_type):
    # Mock locations - replace with your actual bin data
    return [
        {'name': 'Main Recycling Area', 'qr_code': 'recycle123'},
        {'name': 'Cafeteria Recycling', 'qr_code': 'recycle456'}
    ] if bin_type == 'R' else []


