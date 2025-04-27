import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/env/server';
import * as schema from './schema';

const db = drizzle(env.DATABASE_URL, { schema });

export default db;
