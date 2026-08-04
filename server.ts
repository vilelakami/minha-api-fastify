import fastify from 'fastify'; //importando com typescript
import crypto from 'node:crypto';

const server = fastify();

// preciso tipar o array de cursos
type Courses = {
    id: string,
    title: string
}

// lista de courses herdando a tipagem
const courses: Courses[] = [
    {id: '1', title: "Curso de Node.js"},
    {id: '2', title: "Curso de React.js"},
    {id: '3', title: "Curso de React Native"}
]

// verificando se o curso existe e retornando
server.get('/courses/:id', (req, res) => {
    // o tipo do meu params é um objeto que tem a propriedade id do tipo string
    type Params = {
        id: string
    }

    // pegando o id do curso
    const params = req.params as Params;
    const course = courses.find(c => c.id === params.id);

    // se o curso existir, retorno o curso
    if(course) {
        return {course};
    }

    // se o curso nao existir, retorno o status code 404
    return res.status(404).send();
})

// exemplo com post e req body
server.post('/courses', (req, res) => {
    // tipo o body
    type Body = {
        id: string,
        title: string
    }

    // gerando um id randomico
    const courseId = crypto.randomUUID();
    // pegando o title
    const body = req.body as Body;
    const courseTitle = body.title;

    // se o title for vazio, retorno o status code 400
    if(!courseTitle) {
        return res.status(400).send({error: 'Title is required'});
    }
    
    // se o title for preenchido, adiciono o curso no array
    courses.push({id: courseId, title: courseTitle});

    // retorno o status code 201 e o id do curso criado
    return res.status(201).send({id: courseId});
})

server.listen({port:3000}).then(() => {
    console.log('Server is running on port 3000');
})