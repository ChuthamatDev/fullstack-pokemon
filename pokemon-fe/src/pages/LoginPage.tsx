import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import '../App.css';

interface RegisterResponse {
    message: string;
}

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

    const { login, isLoading: isLoginLoading, errorMsg: loginError, setErrorMsg: setLoginError } = useAuth();
    const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        setRegisterError(null);

        if (isRegisterMode) {
            setIsRegisterLoading(true);
            try {
                await axios.post<RegisterResponse>('http://localhost:3000/register', {
                    username,
                    password,
                });
                alert('Registered successfully! Please login.');
                setIsRegisterMode(false);
                setPassword('');
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    setRegisterError(error.response?.data?.message || 'Failed to register.');
                } else {
                    setRegisterError('An unexpected error occurred.');
                }
            } finally {
                setIsRegisterLoading(false);
            }
        } else {
            await login(username, password);
        }
    };

    const isLoading = isRegisterMode ? isRegisterLoading : isLoginLoading;
    const errorMsg = isRegisterMode ? registerError : loginError;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '350px'
            }}>

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/500px-International_Pok%C3%A9mon_logo.svg.png"
                alt="Pokemon Logo"
                style={{ width: '150px', marginBottom: '20px', }}
            />

            <h1 className="pixel-font" style={{ fontSize: '2.5rem', marginTop: 0, color: '#FFCB05', textShadow: '2px 2px 0 #3B4CCA' }}>
                {isRegisterMode ? 'JOIN THE JOURNEY' : 'TRAINER LOGIN'}
            </h1>

            {errorMsg && (
                <div style={{ color: '#D32F2F', backgroundColor: '#FFEBEE', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    containerStyle={{ padding: '2px 10px', borderRadius: '12px', border: username ? '2px solid #3B4CCA' : '2px solid #eee' }}
                />
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    containerStyle={{ padding: '2px 10px', borderRadius: '12px', border: password ? '2px solid #3B4CCA' : '2px solid #eee' }}
                />

                <Button type="submit" disabled={isLoading} style={{ width: '100%' }}>
                    {isLoading ? 'Processing...' : (isRegisterMode ? 'Register' : 'Login')}
                </Button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                {isRegisterMode ? 'Already a trainer?' : 'New to the region?'}
                <span
                    onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setLoginError(null);
                        setRegisterError(null);
                    }}
                    style={{ color: '#3B4CCA', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
                >
                    {isRegisterMode ? 'Login here' : 'Register now'}
                </span>
            </p>
        </div>
        </div>
    );
};