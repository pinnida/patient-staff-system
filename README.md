# Patient Staff System

ระบบลงทะเบียนผู้ป่วยแบบ Real-time สำหรับโรงพยาบาล พัฒนาด้วย Next.js และ WebSocket

## 🚀 Live Demo

**Production URL**: https://patient-staff-system-106420876589.us-central1.run.app

- **หน้าผู้ป่วย**: `/patient` - ลงทะเบียนข้อมูลผู้ป่วย
- **หน้าจ้าหน้าที่**: `/staff` - แดชบอร์ดติดตามสถานะผู้ป่วย

## ✨ Features

- **Real-time Synchronization**: การอัปเดตข้อมูลแบบ real-time ระหว่างผู้ป่วยและเจ้าหน้าที่
- **Responsive Design**: รองรับทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)
- **Form Validation**: ตรวจสอบข้อมูลแบบ real-time
- **Status Tracking**: ติดตามสถานะการลงทะเบียนแบบ live
- **Thai Language Support**: ใช้งานภาษาไทยเต็มรูปแบบ

## 🏗️ Project Structure

```
patient-staff-system/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── patient/           # หน้าลงทะเบียนผู้ป่วย
│   │   └── staff/             # แดชบอร์ดเจ้าหน้าที่
│   ├── components/            # UI Components
│   │   └── common/           # Components ร่วม
│   ├── hooks/                # Custom React Hooks
│   ├── pages/api/            # API Routes
│   └── utils/                # Utility Functions
├── Dockerfile                # Container Configuration
├── cloudbuild.yaml          # Google Cloud Build
└── deploy.sh                # Deployment Script
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io
- **Deployment**: Google Cloud Run
- **Container**: Docker
- **Build**: Google Cloud Build

## 🚀 Deployment

### Prerequisites
- Google Cloud SDK
- Docker Desktop
- Google Cloud Project

### Quick Deploy
```bash
# 1. Set your project ID in deploy.sh
PROJECT_ID="your-project-id"

# 2. Deploy
./deploy.sh
```

### Manual Deploy
```bash
# Build and push
docker build -t gcr.io/PROJECT_ID/patient-staff-system .
docker push gcr.io/PROJECT_ID/patient-staff-system

# Deploy to Cloud Run
gcloud run deploy patient-staff-system \
  --image gcr.io/PROJECT_ID/patient-staff-system \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Cloud Build Deploy
```bash
gcloud builds submit --config cloudbuild.yaml
```

## 📱 Usage

### For Patients
1. ไปที่ `/patient`
2. กรอกข้อมูลส่วนตัว (ชื่อ, นามสกุล, วันเกิด, เพศ, โทรศัพท์, อีเมล, ที่อยู่)
3. กรอกข้อมูลเพิ่มเติม (ภาษา, สัญชาติ, ผู้ติดต่อฉุกเฉิน, ศาสนา)
4. กด "ส่งแบบฟอร์ม"

### For Staff
1. ไปที่ `/staff`
2. ดูรายการผู้ป่วยที่กำลังลงทะเบียน
3. คลิกที่การ์ดผู้ป่วยเพื่อดูรายละเอียด
4. ติดตามสถานะแบบ real-time

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## 📊 Performance

- **Build Size**: ~120KB First Load JS
- **Auto-scaling**: 0-10 instances based on traffic
- **Cold Start**: ~2-3 seconds
- **Memory**: 1GB per instance
- **CPU**: 1 core per instance



### Useful Commands
```bash
# Check service status
gcloud run services describe patient-staff-system --region us-central1

# View logs
gcloud run services logs read patient-staff-system --region us-central1

# Update service
gcloud run services update patient-staff-system --region us-central1
```