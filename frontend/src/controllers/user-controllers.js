import { BASE_API } from '../resources/api';
import axios from 'axios';

// Registrar um novo usuário
async function registerUser({
  name,
  email,
  password1,
  password2,
  cpf_cnpj,
  date_of_birth = null, // Para CPF
  company_name = null,  // Para CNPJ
  date_of_foundation = null, // Para CNPJ
}) {
  try {
    const response = await axios.post(`${BASE_API}/auth/registerUser`, {
      name,
      email,
      password1,
      password2,
      cpf_cnpj,
      date_of_birth,
      company_name,
      date_of_foundation,
    });
    return response;
  } catch (error) {
    console.log('Erro ao registrar usuário:', error.response?.data || error.message);
    throw error;
  }
}

// Fazer login do usuário
async function loginUser(email, password) {
  try {
    const response = await axios.post(`${BASE_API}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.log('Erro ao fazer login:', error.response?.data || error.message);
    throw error;
  }
}

export { registerUser, loginUser };
