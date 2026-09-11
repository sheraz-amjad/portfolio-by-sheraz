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
import { getDBStatus, isDBReady } from '../config/db.js';

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
      const experiences = await Experience.findAll({ order: [['order', 'ASC']] });
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
      const projects = await Project.findAll({ where: query, order: [['order', 'ASC']] });
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
      const skills = await Skill.findAll({ where: query, order: [['order', 'ASC']] });
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
      const certs = await Certification.findAll({ order: [['order', 'ASC']] });
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
      console.log('💾 Saving to PostgreSQL...');
      savedMessage = await ContactMessage.create({
        name,
        email,
        subject: subject || 'Portfolio Contact Submission',
        message,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
        userAgent: req.headers['user-agent'] || ''
      });
      console.log(`✅ Message saved to DB with ID: ${savedMessage.id}`);
    } else {
      console.log('⚠️  PostgreSQL offline - Message logged to console only');
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
          subject: `New message from ${name}${subject ? ` — ${subject}` : ''}`,
          text: `You've got a new message from your portfolio site.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}\n\nReply directly to this email to respond to ${name}.`,
          html: `
    <div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 10px; color: #1e293b;">
      <p style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 8px;">Portfolio Contact Form</p>
      <h2 style="margin: 0 0 16px; color: #0f172a;">New message from ${name}</h2>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 4px 0; color: #64748b; width: 90px;">From</td>
          <td style="padding: 4px 0;"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Email</td>
          <td style="padding: 4px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Subject</td>
          <td style="padding: 4px 0;">${subject || 'N/A'}</td>
        </tr>
      </table>

      <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 3px solid #2563eb;">
        <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #334155;">${message}</p>
      </div>

      <p style="margin-top: 20px; font-size: 13px; color: #94a3b8;">
        💡 Just hit reply — it'll go straight to ${name} at ${email}.
      </p>
    </div>
  `
        });
        console.log(`✅ Notification email sent to ${process.env.EMAIL_RECEIVER || 'sherazamjad933@gmail.com'}`);

        // Confirmation email to the visitor
        console.log('📬 Sending confirmation email to visitor...');
        await transporter.sendMail({
          from: `"Syed Sheraz Amjad" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Thanks for reaching out, ${name}! 👋`,
          text: `Hi ${name},

Thanks for getting in touch through my portfolio! I've received your message and will get back to you as soon as I can — usually within a day or two.

In the meantime, let's connect:
LinkedIn: ${process.env.LINKEDIN_URL || 'https://linkedin.com/in/sherazamjad'}
Portfolio: ${process.env.PORTFOLIO_URL || 'https://sherazamjad.dev'}

I'd love to have you follow along on LinkedIn — I regularly share DevOps tips, project breakdowns, and things I'm learning.

Best,
Syed Sheraz Amjad
DevOps Engineer & Full Stack Developer`,
          html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #ffffff;">

      <!-- Header banner -->
      <div style="background: linear-gradient(135deg, #15803d, #22c55e); padding: 32px 24px; border-radius: 10px 10px 0 0; text-align: center;">
        <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; background: rgba(255,255,255,0.2); border-radius: 50%; font-size: 26px;">✅</div>
        <h2 style="color: #ffffff; margin: 12px 0 4px; font-size: 22px;">Message Received!</h2>
        <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">Thanks for reaching out, ${name}</p>
      </div>

      <!-- Body -->
      <div style="padding: 28px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="line-height: 1.6; color: #334155; margin: 0 0 16px;">
          Hi <strong>${name}</strong>,
        </p>
        <p style="line-height: 1.6; color: #334155; margin: 0 0 16px;">
          I've got your message and will get back to you as soon as I can — usually within <strong>a day or two</strong>.
        </p>

        <!-- LinkedIn CTA card -->
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 14px; color: #0369a1; font-weight: 600;">
            Let's stay connected
          </p>
          <p style="margin: 0 0 16px; font-size: 13px; color: #64748b;">
            I share DevOps tips, project breakdowns, and lessons learned on LinkedIn.
          </p>
          <a href="${process.env.LINKEDIN_URL || 'https://linkedin.com/in/sherazamjad'}"
             style="display: inline-block; background: #0a66c2; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 10px 24px; border-radius: 6px;">
            🔗 Follow me on LinkedIn
          </a>
        </div>

        <p style="line-height: 1.6; color: #334155; margin: 0 0 4px;">
          You can also check out more of my work here:
        </p>
        <p style="margin: 0 0 20px;">
          <a href="${process.env.PORTFOLIO_URL || 'https://sherazamjad.dev'}" style="color: #2563eb; font-weight: 500; text-decoration: none;">
            → View my portfolio
          </a>
        </p>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #64748b;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 2px 0 0; font-weight: 600; color: #0f172a;">Syed Sheraz Amjad</p>
          <p style="margin: 2px 0 0; font-size: 13px;">DevOps Engineer & Full Stack Developer</p>
        </div>
      </div>
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
    server: 'Syed Sheraz Amjad Portfolio SQL Core'
  });
};
