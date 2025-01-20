const fs = require('fs');
const path = require('path');
const readline = require('readline');
const nodemailer = require('nodemailer'); // Optional: For sending email alerts
// Setup logging directory
const logDir = path.join(__dirname, 'call_logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
  console.log(`[INFO] Logging directory created at ${logDir}`);
}
// Keywords for fraud detection
let fraudKeywords = ['OTP', 'bank account', 'credit card', 'fraud', 'password', 'verification'];
// Helper: Add new fraud keywords dynamically
function addFraudKeyword(keyword) {
  if (!fraudKeywords.includes(keyword.toLowerCase())) {
    fraudKeywords.push(keyword.toLowerCase());
    console.log(`[INFO] New keyword added: ${keyword}`);
  } else {
    console.log(`[INFO] Keyword "${keyword}" already exists.`);
  }
}
// Real-time call monitoring function
async function monitorCall(callDetails) {
  try {
    const { callID, duration, frequency, transcript } = callDetails;
    console.log(`[INFO] Monitoring Call ID: ${callID}`);
    let flaggedReasons = [];
    let isFlagged = false;
    // Check 1: Call frequency logic
    if (frequency > 10) {
      isFlagged = true;
      flaggedReasons.push('High call frequency detected');
    }
    // Check 2: Short duration logic
    if (duration < 10) {
      isFlagged = true;
      flaggedReasons.push('Call duration too short');
    }
    // Check 3: Fraud keyword detection
    const suspiciousKeywords = fraudKeywords.filter(keyword =>
      transcript.toLowerCase().includes(keyword.toLowerCase())
    );
    if (suspiciousKeywords.length > 0) {
      isFlagged = true;
      flaggedReasons.push(`Suspicious keywords detected: ${suspiciousKeywords.join(', ')}`);
    }
    // Check 4: Placeholder for voice analysis (AI integration)
    const isFakeVoice = false; // Placeholder logic
    if (isFakeVoice) {
      isFlagged = true;
      flaggedReasons.push('Potential deepfake voice detected');
    }
    // Log call details
    logCall(callDetails, flaggedReasons, isFlagged);
    // Flag call and take action
    if (isFlagged) {
      console.log(`[ALERT] Call ID ${callID} flagged: ${flaggedReasons.join('; ')}`);
      takePreventiveAction(callID, flaggedReasons);
    } else {
      console.log(`[INFO] Call ID ${callID} passed all checks.`);
    }
  } catch (error) {
    console.error(`[ERROR] An error occurred while monitoring the call: ${error.message}`);
  }
}
// Log call details into separate folders
function logCall(callDetails, flaggedReasons, isFlagged) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFileName = `${callDetails.callID}_${timestamp}.json`;
    const logFilePath = path.join(logDir, logFileName);

    const logData = {
      timestamp: new Date().toISOString(),
      callID: callDetails.callID,
      duration: callDetails.duration,
      frequency: callDetails.frequency,
      transcript: callDetails.transcript,
      flagged: isFlagged,
      reasons: flaggedReasons,
    };

    fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));
    console.log(`[INFO] Logged call details to ${logFilePath}`);
  } catch (error) {
    console.error(`[ERROR] Failed to log call details: ${error.message}`);
  }
}
// Take preventive action
function takePreventiveAction(callID, flaggedReasons) {
  try {
    console.log(`[ACTION] Blocking Call ID: ${callID}`);
    console.log(`[ACTION] Notifying security team about flagged reasons: ${flaggedReasons.join('; ')}`);

    // Placeholder: Send email alert (requires email configuration)
    sendEmailAlert(callID, flaggedReasons);
  } catch (error) {
    console.error(`[ERROR] Failed to take preventive action: ${error.message}`);
  }
}
// Optional: Send email alert
function sendEmailAlert(callID, flaggedReasons) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password',       // Replace with your password or app-specific password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'security-team@example.com',
    subject: `Alert: Suspicious Call Detected (ID: ${callID})`,
    text: `The following call has been flagged:\n\nCall ID: ${callID}\nReasons: ${flaggedReasons.join(
      ', '
    )}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`[ERROR] Failed to send email alert: ${error.message}`);
    } else {
      console.log(`[INFO] Email alert sent: ${info.response}`);
    }
  });
}
// Validate user input
function validateInput(input, type) {
  if (type === 'number') {
    const num = parseInt(input, 10);
    return isNaN(num) || num <= 0 ? null : num;
  }
  if (type === 'text') {
    return input.trim() || null;
  }
  return null;
}
// Simulate interactive call analysis
async function simulateCallAnalysis() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter Call ID: ', callID => {
    const validatedCallID = validateInput(callID, 'text');
    if (!validatedCallID) {
      console.error('[ERROR] Invalid Call ID. Aborting analysis.');
      rl.close();
      return;
    }
    rl.question('Enter Call Duration (in seconds): ', duration => {
      const validatedDuration = validateInput(duration, 'number');
      if (!validatedDuration) {
        console.error('[ERROR] Invalid duration. Aborting analysis.');
        rl.close();
        return;
      }

      rl.question('Enter Call Frequency: ', frequency => {
        const validatedFrequency = validateInput(frequency, 'number');
        if (!validatedFrequency) {
          console.error('[ERROR] Invalid frequency. Aborting analysis.');
          rl.close();
          return;
        }

        rl.question('Enter Call Transcript: ', transcript => {
          const validatedTranscript = validateInput(transcript, 'text');
          if (!validatedTranscript) {
            console.error('[ERROR] Invalid transcript. Aborting analysis.');
            rl.close();
            return;
          }
          // Analyze call
          monitorCall({
            callID: validatedCallID,
            duration: validatedDuration,
            frequency: validatedFrequency,
            transcript: validatedTranscript,
          });

          rl.close();
        });
      });
    });
  });
}

// Run simulation
console.log('[INFO] Call Monitoring System Active. Ready to analyze calls.');
simulateCallAnalysis();
