import sharp from 'sharp';
import { statSync } from 'node:fs';

const files = [
  'public/projects/sales-real-time/thumbnail.png',
  'public/projects/postgres-clean-process-superstore/diagram.png',
];

for (const file of files) {
  const before = statSync(file).size;
  const buf = await sharp(file).png({ quality: 85, compressionLevel: 9 }).toBuffer();
  await sharp(buf).png({ quality: 85, compressionLevel: 9 }).toFile(file);
  const after = statSync(file).size;
  const pct = Math.round((1 - after / before) * 100);
  console.log(file, before, '->', after, 'bytes, -' + pct + '%');
}
