import { FastifyPluginAsyncZod } from '@fastify/type-provider-zod';
import { db } from '../database/client.ts';
import { courses } from '../database/schema.ts';
import { z } from 'zod';

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
        schema: {
            tags: ['courses'],
            summary: 'Create a new course',
            description: 'Essa rota cria um novo curso no banco de dados.',
           
            body: z.object({
                title: z.string(),
            }),
            
            response: {
                201: z.object({ courseId: z.string() }).describe("Curso criado com sucesso!"),
            },
        }
        }, async (req, res) => {
            const body = req.body;
            const courseTitle = body.title;
            const result = await db.insert(courses).values({title: courseTitle}).returning();

            return res.status(201).send({courseId: result[0].id});
        }
    )
}