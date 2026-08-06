import { FastifyPluginAsyncZod } from '@fastify/type-provider-zod'; // ajuda na tipagem e na validação dos campos
import { db } from '../database/client.ts'; // importando o banco
import { courses } from '../database/schema.ts'; // importando a tabela
import { z } from 'zod'; // importando o zod pra validação dos campos
import { eq } from 'drizzle-orm'; // importando o operador lógico equals

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        schema: {
            params: z.object({
                        id: z.uuid(),
                    })
            }}, 
            async (req, res) => {
                const courseId = req.params.id;
                const result = await db.select().from(courses).where(eq(courses.id, courseId));
                if(result.length > 0) {
                    return { course: result[0]};
                }
                return res.status(404).send();
            } 
)}
