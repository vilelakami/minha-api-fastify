import fastify from 'fastify'; // importando o fastify
import { fastifySwagger } from '@fastify/swagger'; // importando o swagger (meu arquivo openapi))
import { fastifySwaggerUi } from '@fastify/swagger-ui'; // importando o swagger-ui (meu arquivo openapi visual - interface gráfica))
import { serializerCompiler, validatorCompiler, ZodTypeProvider, jsonSchemaTransform } from '@fastify/type-provider-zod'; // importando o zod
import { getCoursesRoute } from './src/routes/get-courses.ts'; // importando a rota de listar cursos
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'; // importando a rota de listar curso por id
import { createCourseRoute } from './src/routes/create-course.ts'; // importando a rota de criar curso

// criando o servidor
const server = fastify().withTypeProvider<ZodTypeProvider>(); // avisa o TypeScript "essa instância do Fastify usa Zod pra tipar rotas".

server.setSerializerCompiler(serializerCompiler); // essa é a parte que faltava. Diz ao Fastify, em runtime: "quando for validar body/params/querystring, use esse compilador que sabe converter Zod → JSON Schema antes de mandar pro ajv"
server.setValidatorCompiler(validatorCompiler); // mesma coisa mas pro response (quando fomos fazer o openapi)

// passo o servidor pro swagger, onde vamos documentar nossa api
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Minha Primeira API Fastify",
            version: "1.0.0",
        }
    },
    transform: jsonSchemaTransform,
})

// passo o servidor pro swagger-ui para visualizar a documentação da api
server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

// registrando a rota
// também passamos o server como parâmetro pras nossas rotas
server.register(getCoursesRoute);   
server.register(getCourseByIdRoute);
server.register(createCourseRoute);



server.listen({port:3000}).then(() => {
    console.log('Server is running on port 3000');
})