from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from google.cloud import vision
from backend.models import Points  # Import the Points model from the main app
from .models import Report  # Import the Report model from the current app

@login_required
def create_report(request):
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
            # Add more conditions for other waste types
        
        # Create a report record
        report = Report.objects.create(
            user=request.user,
            title=f"Waste Report: {detected_type}",
            location="Unknown",  # You can update this based on user input or GPS data
            description=f"Detected waste type: {detected_type}. Points earned: {points}.",
            image=uploaded_file
        )
        
        # Update user points in the main app's Points model
        Points.update_points(
            user=request.user,
            points=points,
            achievement_type='report'  # Use 'report' as the achievement type
        )
        
        # Get bin locations (assuming this function is defined elsewhere)
        # bin_locations = get_bin_locations(bin_type)
        
        # return render(request, 'bindetails.html', {
        #     'report': report,
        #     'locations': bin_locations,
        #     'points': points
        # })
    
    return render(request, 'reports/create_report.html')