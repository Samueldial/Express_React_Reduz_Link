import bcrypt from 'bcryptjs';

export function getHash(text: string): string {
    return bcrypt.hashSync(text, 9)
}

export function compare (senha: string, hash: string){
    return bcrypt.compare(senha, hash);
}