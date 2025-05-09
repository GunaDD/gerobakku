from channels.generic.websocket import WebsocketConsumer
import json
from .models import Vendor

class VendorLocationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        vendor_id = data.get('vendor_id')
        latitude = data.get('latitude')
        longitude = data.get('longitude')

        # Update vendor location in database
        try:
            vendor = Vendor.objects.get(id=vendor_id)
            vendor.latitude = latitude
            vendor.longitude = longitude
            vendor.save()

            # Broadcast to all connected clients
            self.send(text_data=json.dumps({
                'vendor_id': vendor_id,
                'latitude': latitude,
                'longitude': longitude,
                'vendor_name': vendor.name
            }))
        except Vendor.DoesNotExist:
            pass
