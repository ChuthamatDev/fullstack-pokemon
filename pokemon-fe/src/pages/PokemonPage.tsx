import React, { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { useAuth } from '../hooks/useAuth';
import "../App.css";

import { PokemonSearchForm } from '../components/PokemonSearchForm';
import { PokemonSkeleton } from '../components/PokemonSkeleton';
import { PokemonError } from '../components/PokemonError';
import { PokemonCard } from '../components/PokemonCard';
import { Button } from '../components/ui/Button';

export const PokemonPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { pokemon, isLoading, error, searchPokemon, getRandomPokemon } = usePokemon();
    const { logout } = useAuth();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            searchPokemon(searchTerm);
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div style={{ backgroundColor: '#F6F8FC', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <nav style={{
                flexShrink: 0, height: '70px',
                backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '0 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 1000
            }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Logo" style={{ height: '40px' }} />
                <Button variant="secondary" onClick={handleLogout} style={{ padding: '8px 20px', borderRadius: '20px' }}>
                    Logout
                </Button>
            </nav>

            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box',
                alignItems: 'center'
            }}>
                <PokemonSearchForm 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    handleSearch={handleSearch} 
                    getRandomPokemon={getRandomPokemon} 
                    isLoading={isLoading} 
                    hasResults={!!pokemon || isLoading || !!error}
                />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '400px' }}>
                    {isLoading && <PokemonSkeleton />}
                    {error && !isLoading && <PokemonError error={error} />}
                    {pokemon && !isLoading && !error && <PokemonCard pokemon={pokemon} />}
                </div>
            </div>
        </div>
    );
};