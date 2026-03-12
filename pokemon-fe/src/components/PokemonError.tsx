interface Props {
    error: string;
}

export const PokemonError = ({ error }: Props) => {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '400px',
            minHeight: '450px'
        }}>
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '45%',
                backgroundColor: '#9E9E9E', opacity: 0.15, borderRadius: '50%'
            }} />

            <div style={{
                width: '150px', height: '150px', borderRadius: '50%', zIndex: 1,
                backgroundColor: '#F5F5F5', display: 'flex', justifyContent: 'center', alignItems: 'center',
                marginBottom: '20px', border: '5px solid #FFEBEE'
            }}>
                <span style={{ fontSize: '4rem' }}>❓</span>
            </div>

            <div className="pixel-font" style={{ zIndex: 1, width: '100%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', margin: '10px 0', color: '#D32F2F', textTransform: 'uppercase' }}>
                    Not Found
                </h2>
                <p style={{ color: '#666', fontSize: '1.2rem', marginTop: '10px' }}>
                    {error}
                </p>
            </div>
        </div>
    );
};
