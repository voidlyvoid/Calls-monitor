# Call Monitoring System

This project is a **Call Monitoring System** designed to detect suspicious activities in phone calls by analyzing call metadata and transcripts. It includes functionality for:
- Flagging suspicious calls based on duration, frequency, and transcript content.
- Logging call details for further review.
- Dynamically managing fraud detection keywords.
- Optional email alerts to notify the security team about flagged calls.

---

## Features

### 1. **Dynamic Fraud Keyword Management**
- Add new keywords to the detection list dynamically using the `addFraudKeyword()` function.
- Predefined fraud keywords include:
  - OTP
  - Bank account
  - Credit card
  - Fraud
  - Password
  - Verification

### 2. **Suspicious Call Detection**
- Flags calls based on:
  - **Call frequency**: High number of calls in a short period.
  - **Short duration**: Calls shorter than 10 seconds.
  - **Transcript content**: Identifies suspicious keywords in call transcripts.
  - **Placeholder for AI-based voice analysis**: Detects deepfake or synthetic voices (future feature).

### 3. **Call Logging**
- Logs all call details, including flagged reasons, into JSON files in the `call_logs` directory.
- Each log file is timestamped for better organization.

### 4. **Email Alerts** (Optional)
- Sends email alerts to the security team when a suspicious call is flagged.
- Requires configuration with an email service (e.g., Gmail).

### 5. **Interactive Call Analysis**
- Guides users through the call analysis process with real-time input validation.

---

## Setup Instructions

### Prerequisites
- Node.js installed on your system.
- Basic knowledge of JavaScript and Node.js.

### Installation
1. Clone this repository or download the code.
2. Navigate to the project directory:
   ```bash
   cd call-monitoring-system
   ```
3. Install required dependencies:
   ```bash
   npm install readline fs path nodemailer
   ```

### Running the Application
Run the application with:
```bash
node advancedCallMonitor.js
```

---

## Usage

### Interactive Call Analysis
1. Follow the prompts to enter:
   - **Call ID**: Unique identifier for the call.
   - **Duration**: Length of the call in seconds.
   - **Frequency**: Number of calls made in a short time period.
   - **Transcript**: Text transcription of the call.
2. The system will analyze the call and provide:
   - Reasons for flagging the call (if flagged).
   - A log file with detailed call information.

### Adding Fraud Keywords
To dynamically add new fraud detection keywords:
```javascript
addFraudKeyword('new_keyword');
```
Replace `'new_keyword'` with the desired keyword.

---

## Email Alert Setup (Optional)

To enable email alerts for flagged calls:
1. Update the `sendEmailAlert` function with your email credentials:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com', // Your email
       pass: 'your-password',       // Your password or app-specific password
     },
   });
   ```
2. Replace `your-email@gmail.com` and `your-password` with your email credentials.
3. Ensure less secure app access is enabled or use an app-specific password.

---

## File Structure
```
.
├── monitor.js  # Main application file
├── call_logs/              # Directory for storing call logs
└── README.md               # Documentation
```

---

## Future Enhancements
- Integration with AI-based voice analysis for detecting deepfake or synthetic voices.
- Enhanced UI for managing fraud keywords and reviewing logs.
- Real-time call monitoring with live feeds.

---

## License
This project is licensed under the MIT License. Feel free to use and modify as needed.

