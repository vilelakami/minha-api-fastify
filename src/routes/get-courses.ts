import type { FastifyPluginAsyncZod } from '@fastify/type-provider-zod';
import { db } from '../database/client.ts';
import { courses } from '../database/schema.ts';
import { z } from 'zod';

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses', { schema: { tags: ['courses'], summary: "List all courses", description: "Essa rota lista todos os cursos cadastrados no banco de dados.", response: { 200: z.object({ courses: z.array(z.object({ id: z.string(), title: z.string() }))}).describe("Cursos encontrados com sucesso!")}}}, async (req, res) => {
        const result = await db.select({
            id: courses.id,
            title: courses.title,
        }).from(courses);

        return res.send({courses: result});
    })
}