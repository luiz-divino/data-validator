import { validateUser} from "./validators/userValidator.js";
import type { IUser } from "./types/user.type.js";

console.log("Iniciando validação de dados de usuário...");

const validUserData = {
    id: 'uuid-123',
    username: 'dev_divino',
    email:'userdivino@gmail.com',
    role:'editor',
    bio: 'Este é um usuário de teste.'
};

try {
    const safeUser: IUser = validateUser(validUserData);
    console.log("Usuário validado com sucesso:", safeUser);
}
catch (error){
    console.error("Erro na validação do usuário:", error);
}

const invalidUserData = {
    id: 'uuid-456',
    username: 'dev',
    email:'dev@teste.com',
    role:'superadmin',
}

try {
    console.log('Validando dados de usuário inválidos...');
    const safeUser: IUser = validateUser(invalidUserData);
    console.log("Erro!", safeUser);
}
catch (error){
    console.log('validação falhou:', error);
}


const invalidRoleData = {
    id: 'uuid-789',
    username: 'userteste',
    email:'userteste@example.com',
    role:'supervisor',
}

try {
    const safeUser: IUser = validateUser(invalidRoleData);
    console.log("Erro!", safeUser);
}
catch (error){
    console.log('validação falhou:', error);
}