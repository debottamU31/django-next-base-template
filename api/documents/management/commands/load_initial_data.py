from django.core.management.base import BaseCommand
from documents.models import Document
from django.contrib.auth import get_user_model
import json
import os

class Command(BaseCommand):
    help = 'Load initial data into the database'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@admin.com", "admin")
            print("Superuser created.")
        else:
            print("Superuser already exists.")
        if Document.objects.exists():
            self.stdout.write(self.style.SUCCESS('Data already loaded, skipping initial data load'))
            return
        file_path = os.path.join(os.path.dirname(__file__), 'initial_data.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                Document.objects.update_or_create(type=item['type'], defaults=item)
        self.stdout.write(self.style.SUCCESS('Successfully loaded initial data'))
        
        
