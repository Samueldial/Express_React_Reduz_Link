import { con } from '../database/conexao';
import { Reduzido } from '../model/Reduzidos';
import { Usuario } from '../model/Usuario';

//grava novo usuario
export function gravaUsuario (usuario: Usuario){
    try {
        const criaUsuario = con.query(
            `INSERT INTO users (id, nome, login, senha, idp) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [usuario.id, usuario.nome, usuario.login, usuario.senha, usuario.usuarioID]
        );    
        return criaUsuario;
    } catch (err){
        return false;
    }
};

export function listaTodosUsuarios (){
    try {
        const listaLinks = con.query(
            `SELECT * FROM users`,
        );
        return listaLinks;
    } catch {
        return false
    }
}

//busca usuario por id
export function buscaUsuarioID (id: string){
    try {
        const buscaUsuario = con.query(
            `SELECT * FROM users WHERE id = ($1) RETURNING *`,
            [id]
        );    
        return buscaUsuario;
    } catch (err){
            return(err);
    }
};

//busca usuario por login
export function buscaUsuarioLogin (login: string){
    try {
        const buscaUsuario: any = con.query(
            `SELECT * FROM users WHERE login = $1`,
            [login]
        );         
        return buscaUsuario;
    } catch {
        return false;
    }
};


//grava novo link
export function gravaLink (link: Reduzido){
    try {
        const gravaLink = con.query(
            `INSERT INTO links (id, iduser, linkoriginal, linkreduzido, data, ranking, idpl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [link.id, link.idUser, link.LinkOriginal, link.LinkReduzido, link.Data, link.Ranking, link.reduzidoID]
        );    
        return gravaLink;
    } catch (err){
        return false;
    }
};

//lista links do usuario
export function listaLinks (iduser: string){
    try {
        const listaLinks = con.query(
            `SELECT * FROM links WHERE iduser = ($1)`,
            [iduser]
        );
        return listaLinks;
    } catch (err){
        return false;
    }
};

//lista todos os links
export function listaTodosLinks (){
    try {
        const listaLinks = con.query(
            `SELECT * FROM links`,
        );
        return listaLinks;
    } catch {
        return false
    }
};

//deleta link
export function deletaLink (id: string){
    try {
        const deletaLink = con.query(
            `DELETE FROM links WHERE id = ($1) RETURNING *`,
            [id]
        );
        return deletaLink;
    } catch (err){
        return(err)
    }
};

//update ranking
export function updateRanking (id: string, ranking: number){
    try {
        const updateRanking = con.query(
            `UPDATE links SET ranking = ($1) WHERE id = ($2) RETURNING *`,
            [ranking, id]
        );
        return updateRanking;
    } catch (err){
        return(err)
    }
};


//procura link Original e retorna linha completa
export function procuraLinkOriginal (link: string){
    try {
        const procuraLink = con.query(
            `SELECT * FROM links WHERE linkoriginal = ($1) RETURNING *`,
            [link]
        );
        return procuraLink;
    } catch (err) {
        return (err);
    }
};

//procura link reduzido e retorna linha completa
export function procuraLinkReduzido (link: string){
    try {
        const procuraLink = con.query(
            `SELECT * FROM links WHERE linkreduzido = ($1) RETURNING *`,
            [link]
        );
        return procuraLink;
    } catch (err) {
        return (err);
    }
};