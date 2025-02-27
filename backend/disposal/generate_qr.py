import pyqrcode
import os
from django.conf import settings

def generate_qr(bin_id):
    # URL to the Django scan page
    url = f"http://localhost:8000/scan/{bin_id}/"
    qr = pyqrcode.create(url)
    
    # Save QR code to media folder
    qr_path = os.path.join(settings.MEDIA_ROOT, "qr_codes", f"{bin_id}.png")
    qr.png(qr_path, scale=6)
    print(f"QR code generated: {qr_path}")

# Create media directories if missing
os.makedirs(os.path.join(settings.MEDIA_ROOT, "qr_codes"), exist_ok=True)

# Generate QR codes for demo bins
generate_qr("recycling-bin-1")
generate_qr("compost-bin-1")