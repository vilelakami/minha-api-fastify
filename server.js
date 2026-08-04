/*//importando o fastify
const fastify = require('fastify');
// é uma biblioteca interna do node que permite usar números randomicos, criptografia, etc
const crypto = require('crypto');

//armazenando a instancia do fastify em uma constante
const server = fastify();

//iniciando minha primeira api

const courses = [
    {id: 1, title: "Curso de Node.js"},
    {id: 2, title: "Curso de React.js"},
    {id: 3, title: "Curso de React Native"}
]

// listando todos os cursos (buscando os cursos com GET)
server.get('/courses', () =>{
    return {courses};
})

// agora quero criar um curso novo com método POST
// passo os parâmetros de req e res
server.post('/courses', (req,res) => {
    // gero um id randomico para o curso
    const courseId = crypto.randomUUID();
    // adiciono o curso no array de cursos
    courses.push({id: courseId, title: 'Curso de Java'});

    // retorno o status 201 (created) e o curso criado
    return res.status(201).send({courseId});
})


// agora quero listar um curso com um id especifico, usando o método GET
// o :id é o parâmetro de rota, o req.params é onde ele está armazenado (params)
server.get('/courses/:id', (req,res) => {
    const courseId = req.params.id; // pego o id do curso
    const course = courses.find(c => c.id == courseId); // busco o curso no array de cursos

    
    // se não for encontrado, retorno o status code 404 (not found  )
    if(!course){
        return res.status(404).send();
    }

    // se o curso for encontrado, retorno o curso e o status code 200 (ok)
    return res.status(200).send({course});
})

// exemplo de post com campos obrigatórios, tipo title:
server.post('/courses', (req,res) => {
    // dou um randomUUID para o id
    const courseId = crypto.randomUUID();
    // pego o title do body da requisição
    const courseTitle = req.body.title;

    // se o title for vazio, retorno o status code 400 (bad request)
    if(!courseTitle){
        return res.status(400).send({message: "O campo de title é obrigatório"});
    }

    // se o title for preenchido, adiciono o curso no array
    courses.push({id: courseId, title: courseTitle});

    // retorno o status code 201 (created) e o id do curso criado
    return res.status(200).send({courseId, courseTitle});
})

server.patch('/courses/:id', (req, res) => {
    // pego o id do curso q passie na url
    const courseId = req.params.id;
    // pego o title do body
    const courseTitle = req.body.title;

    // procuro o id do curso no array
    const course = courses.find(c => c.id == courseId);

    // se não existir o curso retorno o status code 404 (not found)
    if(!course){
        return res.status(404).send();
    }

    // se o curso existir, atualizo o title
    course.title = courseTitle;

    // retorno o status code 200 (ok) e o curso atualizado
    return res.status(200).send({course});
})

server.listen({port:3000}).then(() => {
    console.log("servidor rodando na porta 3000");
})*/