// src/services/auth.ts
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    email: string;
    // Other user details...
  };
}

export const getToken = ()=>{
  return  localStorage.getItem('token@MyStock');
}

export const getEmail = ()=>{
  return  localStorage.getItem('email@MyStock');
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<any>('users/login/', credentials);
    const { token, email } = response.data;

    // Save token to localStorage
    localStorage.setItem('token@MyStock', token);

    localStorage.setItem('email@MyStock', email);

    return { token, user:{email} }
  } catch (error) {
    throw error;
  }
};

export const logout = ()=>{
  localStorage.removeItem("token@MyStock")

  localStorage.removeItem("email@MyStock")
}

export const isLoggedIn = ()=>{
  return (localStorage.getItem("token@MyStock") && localStorage.getItem("email@MyStock"))
}
