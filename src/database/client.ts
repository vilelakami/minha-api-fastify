import {drizzle} from 'drizzle-orm/node-postgres';

// aqui é a nossa conexão com o banco, quando formos chamar
// o banco para fazer alguma operação, vamos importar o 'db' que é nossa conexão
export const db = drizzle(process.env.DATABASE_URL)