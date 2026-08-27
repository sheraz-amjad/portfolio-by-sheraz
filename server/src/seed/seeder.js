import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import {
  experiencesData,
  projectsData,
  skillsData,
  certificationsData
} from './seedData.js';

dotenv.config();

export const seedDatabase = async (force = false) => {
  try {
    const expCount = await Experience.countDocuments();
    const projCount = await Project.countDocuments();
    const skillCount = await Skill.countDocuments();
    const certCount = await Certification.countDocuments();

    const isEmpty = expCount === 0 && projCount === 0 && skillCount === 0 && certCount === 0;

    if (!isEmpty && !force) {
      console.log('ℹ️ Database already contains data. Skipping auto-seeding.');
      return;
    }

    console.log('🌱 Seeding database with Syed Sheraz Amjad CV data...');

    if (force || isEmpty) {
      await Experience.deleteMany({});
      await Project.deleteMany({});
      await Skill.deleteMany({});
      await Certification.deleteMany({});
    }

    await Experience.insertMany(experiencesData);
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    await Certification.insertMany(certificationsData);

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${experiencesData.length} Experiences`);
    console.log(`   - ${projectsData.length} Projects`);
    console.log(`   - ${skillsData.length} Skills`);
    console.log(`   - ${certificationsData.length} Certifications & Education`);
  } catch (error) {
    console.error('❌ Error while seeding database:', error.message);
  }
};

// If run directly via CLI
if (process.argv[1]?.endsWith('seeder.js')) {
  const runDirectSeed = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    try {
      console.log(`Connecting to ${uri}...`);
      await mongoose.connect(uri);
      await seedDatabase(true);
      await mongoose.disconnect();
      console.log('Done!');
      process.exit(0);
    } catch (err) {
      console.error('Failed to run seeder CLI:', err.message);
      process.exit(1);
    }
  };
  runDirectSeed();
}
