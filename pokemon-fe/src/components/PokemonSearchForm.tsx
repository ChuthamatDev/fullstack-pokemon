import React from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    getRandomPokemon: () => void;
    isLoading: boolean;
    hasResults: boolean;
}

export const PokemonSearchForm: React.FC<Props> = ({ searchTerm, setSearchTerm, handleSearch, getRandomPokemon, isLoading, hasResults }) => {
    return (
        <form onSubmit={handleSearch} style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            width: '100%',
            marginTop: hasResults ? '3vh' : '25vh',
            marginBottom: '3vh',
            transition: 'margin-top 0.4s ease-in-out'
        }}>
            <Input
                type="text"
                placeholder="Search Pokemon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                containerStyle={{ flex: '0 1 500px' }}
                rightElement={
                    <button type="submit" disabled={isLoading} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3RN5vpO0RTd4bOXj7kAuJMNUHgt2BFuaug&s" alt="Search" style={{ height: '24px', width: '24px', objectFit: 'contain' }} />
                    </button>
                }
            />
            <Button type="button" onClick={getRandomPokemon} disabled={isLoading}>
                Random
            </Button>
        </form>
    );
};
