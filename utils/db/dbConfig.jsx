//postgresql://ai-room-redesign_owner:s9GcKpaRmxe6@ep-crimson-band-a5ev7oz0.us-east-2.aws.neon.tech/zero2hero?sslmode=require
import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from './schema'
const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql,{schema})