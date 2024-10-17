const emailVerificationTemplate = (verificationUrl) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
      .button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Verify Your Email</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>Thank you for signing up! Please click the button below to verify your email address.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="text-decoration: none;">
          <button class="button">Verify Email</button>
        </a>
      </div>
      <p>This link will expire in 15 minutes for security reasons.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
  </html>`;
};

const passwordResetTemplate = (resetUrl) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      .button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .button:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>You are receiving this email because you (or someone else) has requested the reset of a password. Please click the button below to reset your password.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="text-decoration: none;">
          <button class="button">Reset Password</button>
        </a>
      </div>
      <p>This link will expire in 10 minutes for security reasons.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div >
  </body>
  </html>`;
};

export default {
  emailVerificationTemplate,
  passwordResetTemplate,
};
