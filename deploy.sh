#!/bin/bash

# Set variables
PROJECT_ID="patient-staff"  # Replace with your actual GCP project ID
SERVICE_NAME="patient-staff-system"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

# Check if PROJECT_ID is set
if [ "$PROJECT_ID" = "your-project-id" ]; then
    echo "Please set your PROJECT_ID in the deploy.sh file"
    exit 1
fi

echo "Building and deploying to Google Cloud Run..."

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Push the image to Google Container Registry
echo "Pushing image to GCR..."
docker push $IMAGE_NAME

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --project $PROJECT_ID

echo "Deployment complete!"
echo "Your service is available at:"
gcloud run services describe $SERVICE_NAME --region $REGION --project $PROJECT_ID --format 'value(status.url)'
