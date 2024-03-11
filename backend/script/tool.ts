import fsPromises from 'fs/promises';

const src = './src/models/init.sql';
const dest = './build/models/init.sql';

async function move(): Promise<void> {
  await fsPromises.cp(src, dest, { recursive: true });
}

move();
