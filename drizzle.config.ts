// configuramos a ORM drizzle pra trabalhar com o postgres e passamos a url do banco de dados que está no arquivo .env
import {defineConfig} from 'drizzle-kit';

if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    out: './drizzle',
    schema: './src/database/schema.ts',
})