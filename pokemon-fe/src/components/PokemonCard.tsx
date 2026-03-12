import type { PokemonData } from '../hooks/usePokemon';
import { getTypeColor } from '../utils/getTypeColor';

interface Props {
    pokemon: PokemonData;
    onBack?: () => void;
}

export const PokemonCard = ({ pokemon, onBack }: Props) => {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '400px'
        }}>
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '45%',
                backgroundColor: getTypeColor(pokemon.types[0]), opacity: 0.15, borderRadius: '50%'
            }} />

            {onBack && (
                <button onClick={onBack} style={{
                    position: 'absolute', top: '20px', left: '20px', background: 'white', border: 'none',
                    cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10, transition: 'all 0.2s'
                }}>
                    <img src="https://static.vecteezy.com/system/resources/previews/026/551/122/non_2x/arrow-left-button-pixelated-ui-icon-move-back-toolbar-control-previous-track-menu-editable-8bit-graphic-element-outline-isolated-user-interface-image-for-web-mobile-app-retro-style-vector.jpg" alt="Back" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(2.2)' }} />
                </button>
            )}

            <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: '200px', height: '200px', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))' }}
            />

            <div className="pixel-font" style={{ zIndex: 1, width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.2rem', margin: '10px 0', textTransform: 'capitalize', color: '#333' }}>
                    {pokemon.name}
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                    {pokemon.types.map((type) => (
                        <span key={type} style={{ backgroundColor: getTypeColor(type), padding: '6px 16px', borderRadius: '20px', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {type}
                        </span>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', backgroundColor: '#F8F9FA', padding: '15px', borderRadius: '16px' }}>
                    <div style={{ borderRight: '1px solid #E0E0E0' }}>
                        <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Weight</p>
                        <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{pokemon.weight} hg</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>Abilities</p>
                        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {pokemon.abilities.map(ab => (
                                <span key={ab} style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333', textTransform: 'capitalize' }}>{ab.replace('-', ' ')}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
