import type { PokemonListResult } from '../hooks/usePokemon';

interface Props {
    pokemonList: PokemonListResult[];
    onPokemonClick: (name: string) => void;
}

export const PokemonList = ({ pokemonList, onPokemonClick }: Props) => {
    if (pokemonList.length === 0) return null;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '15px',
            width: '100%',
            overflowY: 'auto',
            padding: '10px',
            height: '100%',
            alignContent: 'start',
            boxSizing: 'border-box'
        }}>
            {pokemonList.map((pkmn) => {
                const id = pkmn.url.split('/').filter(Boolean).pop();
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                return (
                    <div
                        key={pkmn.name}
                        onClick={() => onPokemonClick(pkmn.name)}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '15px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 15px rgba(59, 76, 202, 0.2)';
                            e.currentTarget.style.border = '2px solid #3B4CCA';
                            e.currentTarget.style.padding = '13px 8px'; // Prevent layout jump from border
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
                            e.currentTarget.style.border = 'none';
                            e.currentTarget.style.padding = '15px 10px';
                        }}
                    >
                        <img src={imageUrl} alt={pkmn.name} style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                        <span className="pixel-font" style={{ marginTop: '10px', textTransform: 'capitalize', fontWeight: 'bold', color: '#333', fontSize: '1rem', textAlign: 'center' }}>
                            {pkmn.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};
