# Frontend-Backend API Integration Setup

This document provides instructions for connecting the React Native frontend to the C# backend API.

## Prerequisites

- Node.js and npm installed
- Backend API running (from CR4SHXX/ScamWarning-backend- repository)
- React Native development environment set up
- Expo CLI installed

## Installation

1. Clone the repository:
```bash
git clone https://github.com/CR4SHXX/Scam-Warning-frontend.git
cd Scam-Warning-frontend
```

2. Install dependencies:
```bash
npm install
```

The following packages are already included in package.json:
- `axios` (^1.13.2) - HTTP client for API requests
- `@react-native-async-storage/async-storage` (2.2.0) - Local storage for auth tokens

## Configuration

### API Base URL Configuration

The API base URL is configured in `src/services/api.js`. You need to update it based on your development environment:

**File: `src/services/api.js`**
```javascript
// Line 6
const API_BASE_URL = 'http://localhost:5000/api';
```

Update the `API_BASE_URL` constant based on your environment:

### For Android Emulator:
```javascript
const API_BASE_URL = 'http://10.0.2.2:5000/api';
```
Android emulator uses `10.0.2.2` to access the host machine's localhost.

### For iOS Simulator:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```
iOS simulator can directly access localhost.

### For Physical Device (same network):
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5000/api';
```
Replace `YOUR_COMPUTER_IP` with your computer's local IP address (e.g., `http://192.168.1.100:5000/api`).

To find your IP address:
- **Windows**: `ipconfig` (look for IPv4 Address)
- **macOS/Linux**: `ifconfig` or `ip addr` (look for inet address)

### For Production:
```javascript
const API_BASE_URL = 'https://your-deployed-backend.com/api';
```
Use your deployed backend URL.

## Running the Application

1. Start the backend API server first (ensure it's running on port 5000)

2. Start the React Native app:
```bash
npm start
```

3. Choose your platform:
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app for physical device

## API Endpoints Used

### Authentication (`/api/auth`)
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user (returns JWT token)

### Warnings (`/api/warnings`)
- **GET** `/api/warnings` - Get all approved warnings
- **GET** `/api/warnings/{id}` - Get specific warning
- **GET** `/api/warnings/search` - Search warnings
- **POST** `/api/warnings` - Create new warning (requires authentication)

### Categories (`/api/categories`)
- **GET** `/api/categories` - Get all categories

### Comments (`/api/warnings/{warningId}/comments`)
- **GET** `/api/warnings/{warningId}/comments` - Get comments for warning
- **POST** `/api/warnings/{warningId}/comments` - Add comment (requires authentication)

## Authentication Flow

1. User registers or logs in through AuthScreen
2. Backend returns JWT token on successful login
3. Token is stored in AsyncStorage
4. Token is automatically added to all authenticated requests via axios interceptor
5. Protected endpoints (create warning, add comment) require valid token

## Testing the Integration

### Test Basic Connectivity:
1. Open the app and navigate to Home screen
2. If warnings load, the connection is working
3. If you see an error, check:
   - Backend server is running
   - API_BASE_URL is correctly configured
   - Network connectivity

### Test Authentication:
1. Navigate to Auth screen
2. Try registering a new account
3. Try logging in with credentials
4. Success indicates auth endpoints are working

### Test Creating Content:
1. Login first
2. Navigate to "Report Scam" screen
3. Fill out the form and submit
4. Check backend database for new entry

## Common Issues and Troubleshooting

### Connection Refused Error
**Error**: `Network Error` or `Connection refused`

**Solutions**:
- Ensure backend API is running on port 5000
- Check firewall settings
- Verify API_BASE_URL is correct for your environment
- On physical device, ensure both devices are on same network

### CORS Errors
**Error**: `Access-Control-Allow-Origin` error

**Solution**: 
Configure CORS in backend API to allow requests from frontend:
```csharp
// In backend Startup.cs or Program.cs
services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
```

### 401 Unauthorized Errors
**Error**: 401 status code on protected endpoints

**Solutions**:
- Ensure you're logged in
- Check token is stored in AsyncStorage
- Token might be expired (login again)
- Verify Authorization header is being sent

### Timeout Errors
**Error**: Request timeout

**Solutions**:
- Check network connection
- Backend might be slow or overloaded
- Increase timeout in axios configuration if needed

### Cannot Load Warnings
**Symptoms**: Loading indicator stays visible

**Solutions**:
- Check backend API is returning data
- Verify endpoint URL is correct
- Check console for error messages
- Ensure data format matches expected structure

## Development Tips

### Viewing API Requests
Enable console logging to debug API calls:
```javascript
// In src/services/api.js
console.log('API Request:', config);
console.log('API Response:', response);
```

### Clearing Stored Token
If you need to logout manually:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.removeItem('authToken');
```

### Testing with Different Users
Create multiple test accounts to test different scenarios and permissions.

## Security Considerations

- Never commit API keys or sensitive tokens to version control
- Use environment variables for configuration in production
- Implement token refresh mechanism for long-lived sessions
- Always use HTTPS in production
- Validate all user input on both frontend and backend

## Support

For issues related to:
- **Frontend**: Open issue in CR4SHXX/Scam-Warning-frontend
- **Backend**: Open issue in CR4SHXX/ScamWarning-backend-
- **API Integration**: Check both repositories' documentation

## Next Steps

After successful integration:
1. Test all features thoroughly
2. Implement additional security measures
3. Add error tracking and analytics
4. Optimize performance and caching
5. Deploy to production environment

---

**Last Updated**: November 2024
**Version**: 1.0.0
