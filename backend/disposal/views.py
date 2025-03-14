from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate,logout
from django.contrib.auth.forms import UserCreationForm
from google.cloud import vision
from django.core.files.storage import FileSystemStorage
from .models import WasteItem, QRCode
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import re

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
from django.shortcuts import render
from backend.models import Points

def home(request):
    if request.user.is_authenticated:  # Check if user is logged in
        total_points = Points.get_total_points(request.user)  # Fetch total points for the user
        username = request.user.username
    else:
        total_points = 0  # If user is not logged in, set points to 0

    context = {
        'total_points': total_points,  # Passing total points to template
        'username': username  # Passing username to template
    }

    return render(request, 'home.html', context)
def scan_waste(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST' and 'waste_image' in request.FILES:
        # Get uploaded image
        uploaded_file = request.FILES['waste_image']
        
        # Initialize Google Cloud Vision client
        client = vision.ImageAnnotatorClient()
        
        # Read the image file
        image_content = uploaded_file.read()
        image = vision.Image(content=image_content)
        
        # Perform label detection
        response = client.label_detection(image=image)
        labels = response.label_annotations
        
        # Determine waste type and points based on labels
        detected_type = "Other"
        points = 2
        bin_type = 'Recycling'
        
        for label in labels:
            if "bottle" in label.description.lower():
                detected_type = "Plastic Bottle"
                points = 10
                bin_type = 'Recycling'
                break
            elif "can" in label.description.lower():
                detected_type = "Aluminum Can"
                points = 5
                bin_type = 'Recycling'
                break
            elif "banana" in label.description.lower() or "apple" in label.description.lower():
                detected_type = "Food Waste"
                points = 15
                bin_type = 'Compost'
                break
            elif "paper" in label.description.lower() or "cardboard" in label.description.lower():
                detected_type = "Paper Waste"
                points = 8
                bin_type = 'Recycling'
                break
            elif "orange peel" in label.description.lower() or "kiwi" in label.description.lower():
                detected_type = "Food Waste"
                points = 15
                bin_type = 'Compost'
                break
            elif "lettuce" in label.description.lower() or "spinach" in label.description.lower():
                detected_type = "Food Waste"
                points = 15
                bin_type = 'Compost'
                break
            elif "egg shell" in label.description.lower() or "coffee grounds" in label.description.lower():
                detected_type = "Food Waste"
                points = 15
                bin_type = 'Compost'
                break
            elif "straw" in label.description.lower() or "toothpick" in label.description.lower():
                detected_type = "General Waste"
                points = 2
                bin_type = 'General Waste'
                break
            elif "plastic wrap" in label.description.lower() or "styrofoam" in label.description.lower():
                detected_type = "General Waste"
                points = 3
                bin_type = 'General Waste'
                break
            elif "napkin" in label.description.lower() or "paper towel" in label.description.lower():
                detected_type = "General Waste"
                points = 4
                bin_type = 'General Waste'
                break
            elif "meat" in label.description.lower() or "fish" in label.description.lower():
                detected_type = "Food Waste"
                points = 15
                bin_type = 'Compost'
                break
            elif "cereal box" in label.description.lower() or "pizza box" in label.description.lower():
                detected_type = "Paper Waste"
                points = 8
                bin_type = 'Recycling'
                break
            elif "glass" in label.description.lower():
                detected_type = "Glass Bottle"
                points = 10
                bin_type = 'Recycling'
                break
            elif "plastic bag" in label.description.lower():
                detected_type = "Plastic Bag"
                points = 2
                bin_type = 'General Waste'
                break
            elif "batteries" in label.description.lower():
                detected_type = "Batteries"
                points = 0
                bin_type = 'Hazardous Waste'
                break
            elif "light bulb" in label.description.lower():
                detected_type = "Light Bulb"
                points = 0
                bin_type = 'Hazardous Waste'
                break
            elif "diaper" in label.description.lower():
                detected_type = "Diaper"
                points = 2
                bin_type = 'General Waste'
                break
            elif "plastic utensils" in label.description.lower() or "straw" in label.description.lower():
                detected_type = "Plastic Utensils"
                points = 2
                bin_type = 'General Waste'
                break
            elif "candy wrapper" in label.description.lower() or "chip bag" in label.description.lower():
                detected_type = "Snack Wrapper"
                points = 1
                bin_type = 'General Waste'
                break
            elif "old clothes" in label.description.lower() or "shoes" in label.description.lower():
                detected_type = "Textile Waste"
                points = 5
                bin_type = 'General Waste'
                break
            elif "furniture" in label.description.lower():
                detected_type = "Furniture Waste"
                points = 0
                bin_type = 'Bulky Waste'
                break
            elif "electronics" in label.description.lower():
                detected_type = "Electronic Waste"
                points = 0
                bin_type = 'E-Waste'
                break
            elif "wood" in label.description.lower():
                detected_type = "Wood Waste"
                points = 5
                bin_type = 'General Waste'
                break
            elif "garden waste" in label.description.lower() or "leaves" in label.description.lower():
                detected_type = "Garden Waste"
                points = 15
                bin_type = 'Compost'
                break
            # Add more conditions for other waste types
        
        # Create waste item record
        waste_item = WasteItem.objects.create(
            user=request.user,
            item_type=detected_type,
            points=points,
            bin_type=bin_type,
            image=uploaded_file
        )
        
        # Get bin locations
        bin_locations = get_bin_locations(bin_type)
        
        return render(request, 'scanner/bindetails.html', {
            'item': waste_item,
            'locations': bin_locations
        })
    
    return render(request, 'scanner/scan.html')

def get_bin_locations(bin_type):
    # Fetch bin locations from the QRCode model based on bin_type
    bins = QRCode.objects.filter(bin_type=bin_type)
    locations = [{'name': bin.location, 'qr_code': bin.unique_id} for bin in bins]
    return locations

@csrf_exempt
def scan_qr_code(request):
    if request.method == 'POST':
        try:
            import json
            data = json.loads(request.body)
            qr_code_id = data.get('qr_code_id')
            detected_bin_type = data.get('detected_bin_type')

            match = re.search(r'bin-\d+', qr_code_id)
            if match:
                bin_id = match.group()
                print("Extracted Bin ID:", bin_id)

                qr_code = QRCode.objects.get(unique_id=bin_id)

                if qr_code.bin_type == detected_bin_type:
                    return JsonResponse({
                        'redirect': '/confirm/',
                        'bin_id': bin_id,
                        'bin_type': detected_bin_type
                    })
                else:
                    return JsonResponse({'message': 'Incorrect bin type. Please scan the correct bin.'})
            else:
                return JsonResponse({'message': 'Invalid QR code format.'})
        except QRCode.DoesNotExist:
            return JsonResponse({'message': 'QR code not found.'})
        except Exception as e:
            print("Error:", e)
            return JsonResponse({'message': 'Something went wrong.'})

    return render(request, 'scan_qr.html')

def confirm_page(request):
    bin_id = request.GET.get('bin_id')
    bin_type = request.GET.get('bin_type')

    qr_code = QRCode.objects.get(unique_id=bin_id)

    return render(request, 'scanner/confirm.html', {
        'qr_code': qr_code,
        'detected_bin_type': bin_type
    })
def logout_view(request):
    logout(request)  # This will log out the current user
    return redirect('/')