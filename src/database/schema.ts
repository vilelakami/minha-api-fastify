// aqui é onde vão nossas tabelas que serão migradas pro banco de dados
import { pgTable, uuid, text} from 'drizzle-orm/pg-core';

// o nome da tabela é users, dentro do pgTable, que está armazenado dentro de uma variável também chamada users
export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
})

export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull(),
    description: text(),
})