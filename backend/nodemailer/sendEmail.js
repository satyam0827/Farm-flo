import { sendMail } from "./mailer.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to read HTML templates
const readTemplate = (templateName) => {
    try {
        // Adjust the path to read the template from the correct directory
        const templatePath = path.join(__dirname, '../emailTemplates', `${templateName}`);
        const template = fs.readFileSync(templatePath, 'utf8');
        console.log(`Template ${templateName} read successfully.`);
        return template;
    } catch (error) {
        console.error("Error reading template:", error);
        throw new Error(`Could not read the email template: ${templateName}`);
    }
};

// Send verification email
export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const emailTemplate = readTemplate('verificationEmail.html');
        const htmlContent = emailTemplate.replace('{{verificationCode}}', verificationCode);
        const subject = "Verify Your Email Address";
        const text = `Your verification code is: ${verificationCode}`;
        console.log(`Sending verification email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("Verification email sent to:", email);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Could not send verification email");
    }
};

// Send welcome email
export const sendWelcomeEmail = async (email, userName) => {
    try {
        const emailTemplate = readTemplate('welcomeEmail.html');
        console.log("Template content read successfully:", emailTemplate);
        const htmlContent = emailTemplate.replace('{{userName}}', userName);
        console.log("HTML content after replacement:", htmlContent);
        const subject = "Welcome to Our Platform";
        const text = `Welcome, ${userName}! Thank you for joining us.`;
        console.log(`Sending welcome email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("Welcome email sent to:", email);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Could not send welcome email");
    }
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
    try {
        const emailTemplate = readTemplate('otpEmail.html');
        const htmlContent = emailTemplate.replace('{{otp}}', otp);
        const subject = "Your OTP Code";
        const text = `Your OTP is: ${otp}`;
        console.log(`Sending OTP email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("OTP email sent to:", email);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Could not send OTP email");
    }
};

// Send password reset email
export const sendResetEmail = async (email, resetLink) => {
    try {
        const emailTemplate = readTemplate('resetEmail.html');
        const htmlContent = emailTemplate.replace('{{resetLink}}', resetLink);
        const subject = "Password Reset Request";
        const text = `Click on the following link to reset your password: ${resetLink}`;
        console.log(`Sending password reset email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("Password reset email sent to:", email);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error("Could not send password reset email");
    }
};

// Send password reset success email
export const sendResetSuccessEmail = async (email) => {
    try {
        const emailTemplate = readTemplate('resetSuccessEmail.html');
        const htmlContent = emailTemplate;
        const subject = "Password Reset Successful";
        const text = "Your password has been successfully reset.";
        console.log(`Sending password reset success email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("Password reset success email sent to:", email);
    } catch (error) {
        console.error("Error sending reset success email:", error);
        throw new Error("Could not send reset success email");
    }
};

// Send account deletion email
export const sendDeleteEmail = async (email, userName) => {
    try {
        const emailTemplate = readTemplate('deleteEmail.html');
        const htmlContent = emailTemplate.replace('{{userName}}', userName);
        const subject = "Account Deletion Confirmation";
        const text = `Dear ${userName}, your account deletion request has been processed successfully.`;
        console.log(`Sending account deletion email to: ${email}`);
        await sendMail(email, subject, text, htmlContent);
        console.log("Account deletion email sent to:", email);
    } catch (error) {
        console.error("Error sending account deletion email:", error);
        throw new Error("Could not send account deletion email");
    }
};
