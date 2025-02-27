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
from .models import WasteItem,QRCode

def scan_waste(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST' and 'waste_image' in request.FILES:
        # Get uploaded image
        uploaded_file = request.FILES['waste_image']
        
        # Mock detection (Replace with actual ML model)
        detected_type = "Plastic Bottle" if "bottle" in uploaded_file.name.lower() else "Other"
        points = 10 if detected_type == "Plastic Bottle" else 2
        bin_type = 'Recycling' if detected_type == "Plastic Bottle" else 'Recycling'
        
        # Create waste item record (Django handles file saving)
        waste_item = WasteItem.objects.create(
            user=request.user,
            item_type=detected_type,
            points=points,
            bin_type=bin_type,
            image=uploaded_file  # Django will automatically save the file
        )
        bin_locations = get_bin_locations(bin_type)

        return render(request, 'bindetails.html', {
            'item': waste_item,
            'locations': bin_locations
        })
    
    return render(request, 'scan.html')

def get_bin_locations(bin_type):
    # Fetch bin locations from the QRCode model based on bin_type
    bins = QRCode.objects.filter(bin_type=bin_type)
    locations = [{'name': bin.location, 'qr_code': bin.unique_id} for bin in bins]
    return locations
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import re
from .models import QRCode

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

    return render(request, 'confirm.html', {
        'qr_code': qr_code,
        'detected_bin_type': bin_type
    })
