export const PokemonSkeleton = () => {
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
            <div className="skeleton" style={{
                position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '45%',
                borderRadius: '50%'
            }} />

            <div className="skeleton" style={{
                width: '200px', height: '200px', borderRadius: '50%', zIndex: 1, marginBottom: '20px'
            }} />

            <div style={{ zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '60%', height: '36px', marginBottom: '15px', borderRadius: '8px' }} />

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                    <div className="skeleton" style={{ width: '80px', height: '28px', borderRadius: '20px' }} />
                    <div className="skeleton" style={{ width: '80px', height: '28px', borderRadius: '20px' }} />
                </div>

                <div className="skeleton" style={{ width: '100%', height: '90px', borderRadius: '16px' }} />
            </div>
        </div>
    );
};
