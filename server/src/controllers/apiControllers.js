import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import ContactMessage from '../models/ContactMessage.js';
import {
  experiencesData,
  projectsData,
  skillsData,
  certificationsData,
  personalInfoData
} from '../seed/seedData.js';
import { getDBStatus } from '../config/db.js';

// Helper to verify if DB is queryable
const isDBReady = () => mongoose.connection.readyState === 1;

// @desc Get Personal Profile Info
// @route GET /api/profile
export const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: personalInfoData
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc Get Work Experience
// @route GET /api/experience
export const getExperience = async (req, res) => {
  try {
    if (isDBReady()) {
      const experiences = await Experience.find().sort({ order: 1 });
      if (experiences && experiences.length > 0) {
        return res.status(200).json({ success: true, count: experiences.length, data: experiences });
      }
    }
    // Fallback if DB empty or starting
    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: experiencesData.length,
      data: experiencesData
    });
  } catch (error) {
    console.error('Error in getExperience:', error.message);
    return res.status(200).json({
      success: true,
      source: 'fallback-on-error',
      count: experiencesData.length,
      data: experiencesData
    });
  }
};

// @desc Get Projects
// @route GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    if (isDBReady()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.featured = true;
      }
      const projects = await Project.find(query).sort({ order: 1 });
      if (projects && projects.length > 0) {
        return res.status(200).json({ success: true, count: projects.length, data: projects });
      }
    }
    // Fallback
    let result = [...projectsData];
    if (category && category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    if (featured === 'true') {
      result = result.filter(p => p.featured);
    }
    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error('Error in getProjects:', error.message);
    return res.status(200).json({
      success: true,
      source: 'fallback-on-error',
      count: projectsData.length,
      data: projectsData
    });
  }
};

// @desc Get Skills
// @route GET /api/skills
export const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    if (isDBReady()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const skills = await Skill.find(query).sort({ order: 1 });
      if (skills && skills.length > 0) {
        return res.status(200).json({ success: true, count: skills.length, data: skills });
      }
    }
    // Fallback
    let result = [...skillsData];
    if (category && category !== 'All') {
      result = result.filter(s => s.category === category);
    }
    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error('Error in getSkills:', error.message);
    return res.status(200).json({
      success: true,
      source: 'fallback-on-error',
      count: skillsData.length,
      data: skillsData
    });
  }
};

// @desc Get Certifications & Education
// @route GET /api/certifications
export const getCertifications = async (req, res) => {
  try {
    if (isDBReady()) {
      const certs = await Certification.find().sort({ order: 1 });
      if (certs && certs.length > 0) {
        return res.status(200).json({ success: true, count: certs.length, data: certs });
      }
    }
    return res.status(200).json({
      success: true,
      source: 'fallback',
      count: certificationsData.length,
      data: certificationsData
    });
  } catch (error) {
    console.error('Error in getCertifications:', error.message);
    return res.status(200).json({
      success: true,
      source: 'fallback-on-error',
      count: certificationsData.length,
      data: certificationsData
    });
  }
};

// @desc Handle Contact Form Submission
// @route POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('\n🔔 NEW CONTACT FORM SUBMISSION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📝 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📌 Subject: ${subject || 'N/A'}`);
    console.log(`💬 Message: ${message.substring(0, 50)}...`);

    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log(`❌ Email validation failed: ${email}`);
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    let savedMessage = null;

    if (isDBReady()) {
      console.log('💾 Saving to MongoDB...');
      savedMessage = await ContactMessage.create({
        name,
        email,
        subject: subject || 'Portfolio Contact Submission',
        message,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        userAgent: req.headers['user-agent'] || ''
      });
      console.log(`✅ Message saved to DB with ID: ${savedMessage._id}`);
    } else {
      console.log('⚠️  MongoDB offline - Message logged to console only');
      console.log('📝 Received Contact Form (DB offline):', {
        name,
        email,
        subject,
        message,
        time: new Date().toISOString()
      });
    }

    // Optional Nodemailer notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('\n📧 EMAIL CONFIGURATION DETECTED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`✅ EMAIL_USER: ${process.env.EMAIL_USER}`);
      console.log(`✅ EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'gmail'}`);
      
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Email to portfolio owner (Sheraz)
        console.log('\n📬 Sending notification email to owner...');
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_RECEIVER || 'sherazamjad933@gmail.com',
          replyTo: email,
          subject: `⚡ [Portfolio Message] from ${name}: ${subject || 'Inquiry'}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0f172a;">New Message from Portfolio Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
                <p style="white-space: pre-wrap; margin: 0; color: #334155;">${message}</p>
              </div>
            </div>
          `
        });
        console.log(`✅ Notification email sent to ${process.env.EMAIL_RECEIVER || 'sherazamjad933@gmail.com'}`);

        // Confirmation email to the visitor
        console.log('📬 Sending confirmation email to visitor...');
        await transporter.sendMail({
          from: `"Syed Sheraz Amjad" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `✅ Message Received - ${name}, Thanks for reaching out!`,
          text: `Hi ${name},\n\nThank you for getting in touch! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nSyed Sheraz Amjad`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f0fdf4;">
              <h2 style="color: #15803d;">✅ Message Received!</h2>
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out! I have received your message and will respond to you as soon as possible.</p>
              <p style="margin-top: 20px; color: #666;">Best regards,<br><strong>Syed Sheraz Amjad</strong><br>DevOps Engineer & Full Stack Developer</p>
            </div>
          `
        });
        console.log(`✅ Confirmation email sent to ${email}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } catch (mailError) {
        console.error('❌ EMAIL ERROR:', mailError.message);
        console.warn('⚠️  Nodemailer dispatch warning:', mailError.message);
        console.log('💡 Check Gmail app password and 2FA enabled');
        console.log('💡 See: https://myaccount.google.com/apppasswords\n');
      }
    } else {
      console.log('\n⚠️  EMAIL NOT CONFIGURED');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('❌ EMAIL_USER or EMAIL_PASS missing in .env');
      console.log('💡 Contact form will save to database but emails won\'t send');
      console.log('💡 See GMAIL_SETUP.md for configuration\n');
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you, Syed Sheraz Amjad has received your message and will respond shortly.',
      data: {
        name,
        email,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('\n❌ ERROR IN CONTACT SUBMISSION');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('Error message:', error.message);
    console.error('Stack:', error.stack);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message. Please reach out directly at sherazamjad933@gmail.com.'
    });
  }
};

// @desc Health Check Endpoint
// @route GET /api/health
export const getHealth = async (req, res) => {
  return res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: getDBStatus(),
    environment: process.env.NODE_ENV || 'development',
    server: 'Syed Sheraz Amjad Portfolio MERN Core'
  });
};
