# Deployment Guide for Patient Staff System

This guide will help you deploy the Patient Staff System to Google Cloud Run.

## Prerequisites

1. **Google Cloud SDK**: Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. **Docker**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. **Google Cloud Project**: Create a project in the [Google Cloud Console](https://console.cloud.google.com/)

## Setup

### 1. Authenticate with Google Cloud

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Configure Docker for GCR

```bash
gcloud auth configure-docker
```

## Deployment Options

### Option 1: Quick Deploy (Recommended)

1. Edit `deploy.sh` and replace `your-project-id` with your actual GCP project ID
2. Run the deployment script:

```bash
./deploy.sh
```

### Option 2: Manual Deployment

1. **Build the Docker image:**
```bash
docker build -t gcr.io/YOUR_PROJECT_ID/patient-staff-system .
```

2. **Push to Google Container Registry:**
```bash
docker push gcr.io/YOUR_PROJECT_ID/patient-staff-system
```

3. **Deploy to Cloud Run:**
```bash
gcloud run deploy patient-staff-system \
  --image gcr.io/YOUR_PROJECT_ID/patient-staff-system \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

### Option 3: Using Cloud Build

1. **Submit build to Cloud Build:**
```bash
gcloud builds submit --config cloudbuild.yaml
```

## Configuration

### Environment Variables

If you need to set environment variables for your Cloud Run service:

```bash
gcloud run services update patient-staff-system \
  --set-env-vars="NODE_ENV=production,API_URL=https://your-api-url.com" \
  --region us-central1
```

### Custom Domain (Optional)

To use a custom domain:

1. **Map your domain:**
```bash
gcloud run domain-mappings create \
  --service patient-staff-system \
  --domain your-domain.com \
  --region us-central1
```

2. **Follow the DNS configuration instructions provided by Google Cloud**

## Monitoring and Logs

### View Logs
```bash
gcloud run services logs read patient-staff-system --region us-central1
```

### Monitor Performance
- Visit the [Cloud Run console](https://console.cloud.google.com/run)
- Check metrics, logs, and performance data

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are properly listed in `package.json`
2. **Service won't start**: Verify the port is set to 3000 and the service is listening on 0.0.0.0
3. **Memory issues**: Increase memory allocation in the deployment command
4. **Socket.io issues**: Ensure WebSocket connections are properly configured for Cloud Run

### Useful Commands

```bash
# Check service status
gcloud run services describe patient-staff-system --region us-central1

# Update service configuration
gcloud run services update patient-staff-system --region us-central1

# Delete service
gcloud run services delete patient-staff-system --region us-central1
```

## Cost Optimization

- **Min instances**: Set to 0 to allow scaling to zero when not in use
- **Max instances**: Adjust based on expected traffic
- **Memory/CPU**: Start with 1Gi/1 CPU and adjust based on performance needs
- **Region**: Choose the region closest to your users

## Security Considerations

- The service is currently set to allow unauthenticated access
- For production, consider implementing authentication
- Use HTTPS (automatically provided by Cloud Run)
- Regularly update dependencies for security patches
