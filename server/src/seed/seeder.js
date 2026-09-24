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
import { connectDB, sequelize, isDBReady } from '../config/db.js';

dotenv.config();

export const seedDatabase = async (force = true) => {
  if (!isDBReady()) {
    console.log('ℹ️ SQL is not connected. Skipping database seeding.');
    return;
  }

  try {
    if (!force) {
      const expCount = await Experience.count();
      const projCount = await Project.count();
      const skillCount = await Skill.count();
      const certCount = await Certification.count();
      const isEmpty = expCount === 0 && projCount === 0 && skillCount === 0 && certCount === 0;

      if (!isEmpty) {
        console.log('ℹ️ Database already contains data. Skipping auto-seeding.');
        return;
      }
    }

    console.log('🌱 Synchronizing database with latest Syed Sheraz Amjad CV data...');

    await Experience.destroy({ where: {} });
    await Project.destroy({ where: {} });
    await Skill.destroy({ where: {} });
    await Certification.destroy({ where: {} });

    await Experience.bulkCreate(experiencesData);
    await Project.bulkCreate(projectsData);
    await Skill.bulkCreate(skillsData);
    await Certification.bulkCreate(certificationsData);

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
    try {
      await connectDB();
      await seedDatabase(true);
      await sequelize.close();
      console.log('Done!');
      process.exit(0);
    } catch (err) {
      console.error('Failed to run seeder CLI:', err.message);
      process.exit(1);
    }
  };
  runDirectSeed();
}
