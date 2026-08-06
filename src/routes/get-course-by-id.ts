import { FastifyPluginAsyncZod } from '@fastify/type-provider-zod'; // ajuda na tipagem e na validação dos campos
import { db } from '../database/client.ts'; // importando o banco
import { courses } from '../database/schema.ts'; // importando a tabela
import { z } from 'zod'; // importando o zod pra validação dos campos
import { eq } from 'drizzle-orm'; // importando o operador lógico equals

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        schema: {
            tags: ['courses'],
            summary:'Get a course by id',
            description: "Essa rota busca um curso pelo id específico.",
            params: z.object({
                        id: z.uuid(),
                    }),
                    response: {
                        200: z.object({course: z.object({ id: z.string(), title: z.string() })}).describe("Curso encontrado com sucesso!"),
                        404: z.object({message: z.string()}).describe("Curso não encontrado!"),
                    }
            }}, 
            async (req, res) => {
                const courseId = req.params.id;
                const result = await db.select().from(courses).where(eq(courses.id, courseId));
                if(result.length > 0) {
                    return { course: result[0]};
                }
                return res.status(404).send({message: "Curso não encontrado"});
            } 
)}
