import 'dotenv/config';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/english-ease';

async function seed() {
  console.log(`Connecting to MongoDB: ${MONGODB_URI}`);
  await mongoose.connect(MONGODB_URI);

  const db = mongoose.connection.db!;

  // Drop existing collections for clean seed
  const collections = await db.listCollections().toArray();
  for (const col of collections) {
    await db.collection(col.name).drop();
    console.log(`  Dropped collection: ${col.name}`);
  }

  // Seed grammar units (Unit 1: Job + Unit 2: Essential Grammar)
  console.log('Seeding grammar units...');
  const { grammarUnits } = await import('../../frontend/src/data/grammar/index.ts');
  await db.collection('grammar_units').insertMany(
    grammarUnits.map((u: any) => ({ ...u, _id: undefined })),
  );
  console.log(`  Inserted ${grammarUnits.length} grammar units.`);

  // Seed stories
  console.log('Seeding stories...');
  const { stories } = await import('../../frontend/src/data/stories/index.ts');
  await db.collection('stories').insertMany(
    stories.map((s: any) => ({ ...s, _id: undefined })),
  );
  console.log(`  Inserted ${stories.length} stories.`);

  // Seed vocabulary (20+ job words with Khmer translations)
  console.log('Seeding vocabulary...');
  const { jobVocabulary } = await import('../../frontend/src/data/vocabulary/jobs.ts');
  await db.collection('vocabulary_words').insertMany(
    jobVocabulary.map((w: any) => ({ ...w, _id: undefined })),
  );
  console.log(`  Inserted ${jobVocabulary.length} vocabulary words.`);

  await mongoose.disconnect();
  console.log('Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
