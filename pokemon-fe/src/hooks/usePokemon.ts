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

export interface PokemonListResult {
    name: string;
    url: string;
}

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [pokemonList, setPokemonList] = useState<PokemonListResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isListLoading, setIsListLoading] = useState<boolean>(false);
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


    const clearPokemon = useCallback(() => {
        setPokemon(null);
        setError(null);
    }, []);

    const searchPokemon = (name: string) => fetchPokemon(`/pokemon/${name.toLowerCase()}`, true);
    const getRandomPokemon = () => fetchPokemon('/pokemon/random', false);

    const fetchInitialList = useCallback(async () => {
        setIsListLoading(true);
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
            setPokemonList(response.data.results);
        } catch (e) {
            console.error("Failed to fetch initial pokemon list", e);
        } finally {
            setIsListLoading(false);
        }
    }, []);

    return { pokemon, pokemonList, isLoading, isListLoading, error, searchPokemon, getRandomPokemon, fetchInitialList, clearPokemon };
};