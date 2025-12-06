import type { IUser, UserRole } from "../types/user.type.js";

const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
};

const isValidRole = (role: any): role is UserRole => {
    const validRoles: UserRole[] = ['admin', 'editor', 'viewer'];
    return typeof role === 'string' && validRoles.includes(role as UserRole);
};

export function isUser(data: any): data is IUser {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    return (
        'id' in data && typeof data.id === 'string' &&
        'username' in data && typeof data.username === 'string' &&
        'email' in data && typeof data.email === 'string' &&
        'role' in data && isValidRole(data.role)
    )
}

export function validateUser(data: any): IUser {
    // 1. Validação Estrutural (Usando o Type Guard)
    if (!isUser(data)) {
        throw new Error('Dados de Usuário inválidos: Faltam campos obrigatórios ou tipos incorretos.');
    }

    // 2. Validações de Conteúdo (Runtime)
    if (data.username.length < 5) {
        throw new Error('Nome de usuário deve ter no mínimo 5 caracteres.');
    }

    if (!isValidEmail(data.email)) {
        throw new Error('Formato de e-mail inválido.');
    }

    if (data.bio && data.bio.length > 200) {
        throw new Error('A biografia excede o limite de 200 caracteres.');
    }

    return data as IUser;
}