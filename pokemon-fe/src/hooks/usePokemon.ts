import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';
export interface PokemonData {
    name: string;
    types: string[];
    weight: number;
    abilities: string[];
    image: string;
}

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    const fetchPokemon = useCallback(async (endpoint: string, requiresAuth: boolean = true) => {
        setIsLoading(true);
        setError(null);
        setPokemon(null);

        try {
            const headers: Record<string, string> = {};

            if (requiresAuth) {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    logout();
                    return;
                }
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await axios.get<PokemonData>(`http://localhost:3000${endpoint}`, { headers });
            setPokemon(response.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    logout();
                } else if (err.response?.status === 404) {
                    setError('Pokemon not found!');
                } else {
                    setError(err.response?.data?.message || 'Failed to fetch data');
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }, [logout]);


    const searchPokemon = (name: string) => fetchPokemon(`/pokemon/${name.toLowerCase()}`, true);
    const getRandomPokemon = () => fetchPokemon('/pokemon/random', false);

    return { pokemon, isLoading, error, searchPokemon, getRandomPokemon };
};