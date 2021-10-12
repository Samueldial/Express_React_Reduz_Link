import express from 'express';
import { Usuario } from '../model/Usuario';
import { v4 as uuidv4 } from 'uuid';
import { getHash } from '../utils/criptografia';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { buscaUsuarioLogin, deletaLink, gravaLink, gravaUsuario, listaLinks, listaTodosLinks, listaTodosUsuarios } from '../utils/bdreqres';
import { reduzLink } from '../utils/links';
import { Reduzido } from '../model/Reduzidos';

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

const listaDeUsuarios: Usuario[] = []; 
const SECRET = 'Minh4Auth1';


function loggerMiddleware(req : express.Request, res : express.Response, next : express.NextFunction){
    console.log(`${req.method} ${req.path} - ${new Date()}`);
    next();
};

function authMiddleware(req : express.Request, res : express.Response, next : express.NextFunction){
    const token: any = req.headers.authorization;

    jwt.verify(token, SECRET, function(err: any) {
        if (err) {
            return res.status(401).send("usuario não autorizado");
        } else {
            next();
        }
    });
};

app.get('/', (req, res) => {
    res.status(200).send("funcionando");
});

//cria usuario
app.post('/usuario', (req, res) => {
    const usuario = req.body as Usuario;
    usuario.id = uuidv4();
    usuario.senha = getHash(usuario.senha);
    listaDeUsuarios.push(usuario);

    const dbUsuario: any = gravaUsuario (usuario);
    if(dbUsuario){
        console.log(dbUsuario);
        res.status(201).send(usuario);
    } else {
        res.status(404).send("erro");
    }
});

//loga usuario e recebe token
app.post('/auth/login', async (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;
    
    console.log(login);
    
    const listaFiltrada: any = buscaUsuarioLogin(login);
    const { rows } = await listaFiltrada;

    if (listaFiltrada){
        if (rows.length != 0 && await compare(senha, rows[0]['senha'])) {
            const token = jwt.sign({id: rows[0]['login'], nome: rows[0]['nome'], login: rows[0]['login']}, SECRET, {expiresIn: '2h'});
            res.send({token: token});
        } else {
            res.status(401).send('Login ou Senha invalida');
        }
    } else {
        res.status(401).send('Usuario não autorizado');
    }
});

//lista todos os usuarios
app.get('/usuarios', authMiddleware, async (req, res) => {
    const todosUsuarios: any = await listaTodosUsuarios();
    
    res.json(todosUsuarios.rows).status(201);
});

//deleta usuário
app.delete('/usuario/:id', authMiddleware, (req, res) => {

});

//Grava novo link
app.post('/links',authMiddleware, async (req, res) => {
    console.log("chegou");
    try{
        const link = req.body as Reduzido;
        const { idUser } = req.body;
        const { linkOriginal } = req.body;

        link.id = uuidv4();
        link.idUser = idUser;
        link.LinkOriginal = linkOriginal;
        link.LinkReduzido = reduzLink(linkOriginal);
        link.Data = new Date();
        link.Ranking = 0;
        link.reduzidoID = "1"
        
        const gravaNovoLink: any = gravaLink(link);

        if(await gravaNovoLink){
            res.json((await gravaNovoLink).rows).status(201);
        } else {
            res.status(404).send("Erro ao gravar");
        }

    } catch (err){
        console.log("erro");
        res.status(404).send("Erro na consulta");
    }
});

//lista links do usuario
app.get('/usuario/:id', authMiddleware, async (req, res) => {
    try{
        const idUser  = req.params.id;
        const listLinksUser = await listaLinks(idUser);
        if(listLinksUser){
            res.json((listLinksUser).rows).status(201);
        } else {
            res.status(404).send("Erro na resposta");
        }

    } catch (err) {
        res.status(404).send("Erro na consulta");
    }
});

//apaga link

app.delete('/usuario/:idlink', authMiddleware, async (req, res) => {
        console.log("ok");
    try{
        const idLink = req.params.idlink;
        console.log(idLink);
        const deleteLink: any = await deletaLink(idLink);
        if(deleteLink){
            res.json((deleteLink).rows).status(201);
        } else {
            res.status(404).send("Erro na resposta");
        }

    } catch (err) {
        res.status(404).send("Erro na consulta");
    }
});

//gera links reduzidos



app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
