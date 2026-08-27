import express from 'express';
import {
  getProfile,
  getExperience,
  getProjects,
  getSkills,
  getCertifications,
  submitContact,
  getHealth
} from '../controllers/apiControllers.js';

const router = express.Router();

// Health Check
router.get('/health', getHealth);

// Profile
router.get('/profile', getProfile);

// Experience
router.get('/experience', getExperience);

// Projects
router.get('/projects', getProjects);

// Skills
router.get('/skills', getSkills);

// Certifications & Education
router.get('/certifications', getCertifications);

// Contact submission
router.post('/contact', submitContact);

export default router;
