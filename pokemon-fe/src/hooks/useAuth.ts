import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
    access_token: string;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setErrorMsg(null);
        try {
            const response = await axios.post<LoginResponse>('http://localhost:3000/login', {
                username,
                password,
            });
            localStorage.setItem('access_token', response.data.access_token);
            navigate('/pokemon');
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMsg(error.response?.data?.message || 'Something went wrong with the server.');
            } else {
                setErrorMsg('An unexpected error occurred.');
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    const isAuthenticated = !!localStorage.getItem('access_token');

    return { login, logout, isAuthenticated, isLoading, errorMsg, setErrorMsg, setIsLoading };
};
