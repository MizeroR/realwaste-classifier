"""
Locust load testing file for Waste Classifier API
Simulates flood requests to test API performance under load
"""

from locust import HttpUser, task, between
import random
import os
from io import BytesIO
from PIL import Image

class WasteClassifierUser(HttpUser):
    """
    Simulates a user making requests to the Waste Classifier API
    """
    # Wait between 1-3 seconds between tasks
    wait_time = between(1, 3)
    
    def on_start(self):
        """Called when a simulated user starts"""
        print("Starting load test user...")
        # Create a test image in memory
        self.test_image = self._create_test_image()
    
    def _create_test_image(self):
        """Create a simple test image for upload"""
        # Create a 224x224 RGB image with random colors
        img = Image.new('RGB', (224, 224), color=(
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        ))
        
        # Save to BytesIO object
        img_byte_arr = BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        return img_byte_arr.getvalue()
    
    @task(5)  # Weight: 5 (most common task)
    def predict_waste(self):
        """
        Simulate image upload and prediction request
        This is the main endpoint users will hit
        """
        # Create file-like object
        files = {
            'image': ('test_image.jpg', self.test_image, 'image/jpeg')
        }
        
        with self.client.post(
            "/predict",
            files=files,
            catch_response=True,
            name="/predict [Image Classification]"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    response.success()
                else:
                    response.failure(f"Prediction failed: {data.get('error')}")
            else:
                response.failure(f"Got status code {response.status_code}")
    
    @task(2)  # Weight: 2 (common)
    def health_check(self):
        """
        Check API health status
        """
        with self.client.get(
            "/health",
            catch_response=True,
            name="/health [Health Check]"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'healthy':
                    response.success()
                else:
                    response.failure("API not healthy")
            else:
                response.failure(f"Got status code {response.status_code}")
    
    @task(1)  # Weight: 1 (less common)
    def get_classes(self):
        """
        Get list of available classes
        """
        with self.client.get(
            "/classes",
            catch_response=True,
            name="/classes [Get Classes]"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if 'classes' in data:
                    response.success()
                else:
                    response.failure("No classes in response")
            else:
                response.failure(f"Got status code {response.status_code}")
    
    @task(1)  # Weight: 1 (less common)
    def get_stats(self):
        """
        Get API statistics
        """
        with self.client.get(
            "/stats",
            catch_response=True,
            name="/stats [Get Statistics]"
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Got status code {response.status_code}")
    
    @task(1)  # Weight: 1 (rare, simulates retraining)
    def retrain_request(self):
        """
        Simulate retrain request with images
        """
        # Create multiple test images
        files = [
            ('images', ('test1.jpg', self.test_image, 'image/jpeg')),
            ('images', ('test2.jpg', self.test_image, 'image/jpeg')),
        ]
        
        with self.client.post(
            "/retrain",
            files=files,
            catch_response=True,
            name="/retrain [Model Retraining]"
        ) as response:
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    response.success()
                else:
                    response.failure(f"Retrain failed: {data.get('error')}")
            else:
                response.failure(f"Got status code {response.status_code}")


# Configuration for different load scenarios
class LightLoad(WasteClassifierUser):
    """Light load: Few users, slow ramp-up"""
    wait_time = between(2, 5)


class HeavyLoad(WasteClassifierUser):
    """Heavy load: Many users, fast requests"""
    wait_time = between(0.5, 1.5)


class SpikeLoad(WasteClassifierUser):
    """Spike load: Sudden burst of traffic"""
    wait_time = between(0.1, 0.5)
