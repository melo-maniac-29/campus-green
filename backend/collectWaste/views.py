from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Report

def collect_list(request):
    reports = Report.objects.all()  # Fetch all reports from the database
    return render(request, 'collect/report_list.html', {'reports': reports})


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Report, CleaningProof

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from google.cloud import vision
from .models import Report, CleaningProof, Points

@login_required
def upload_cleaning_proof(request, report_id):
    report = Report.objects.get(id=report_id)
    
    if request.method == 'POST' and 'proof_image' in request.FILES:
        proof_image = request.FILES['proof_image']
        
        # Create a new CleaningProof record with status 'pending'
        cleaning_proof = CleaningProof.objects.create(
            user=request.user,
            report=report,
            proof_image=proof_image,
            status='pending'
        )
        
        # Verify the cleaning proof using AI (Google Cloud Vision)
        client = vision.ImageAnnotatorClient()
        image_content = proof_image.read()
        image = vision.Image(content=image_content)
        
        # Perform label detection
        response = client.label_detection(image=image)
        labels = response.label_annotations
        
        # Check if the image contains evidence of cleaning
        is_verified = any(label.description.lower() in ['clean', 'cleaning', 'trash bag', 'broom'] for label in labels)
        
        if is_verified:
            # Update the CleaningProof status to 'verified'
            cleaning_proof.status = 'verified'
            cleaning_proof.save()
            
            # Award points to the user
            Points.update_points(
                user=request.user,
                points=10,  # Example: 10 points for verified cleaning
                achievement_type='cleaned_waste'
            )
        
        # Redirect to a verification result page
        return redirect('verification_result', proof_id=cleaning_proof.id)
    
    return render(request, 'collect/upload_cleaning_proof.html', {'report': report})


@login_required
def verification_result(request, proof_id):
    cleaning_proof = CleaningProof.objects.get(id=proof_id)
    is_verified = cleaning_proof.status == 'verified'
    points_earned = 10 if is_verified else 0
    
    return render(request, 'collect/verification_result.html', {
        'cleaning_proof': cleaning_proof,
        'is_verified': is_verified,
        'points_earned': points_earned
    })