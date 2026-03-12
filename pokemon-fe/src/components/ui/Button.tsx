import React, { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, children, disabled, ...props }) => {
    const isPrimary = variant === 'primary';

    const baseStyle: React.CSSProperties = {
        padding: '12px 25px',
        borderRadius: '30px',
        border: isPrimary ? '2px solid #FFCB05' : '2px solid #ddd',
        backgroundColor: disabled ? '#9E9E9E' : (isPrimary ? '#3B4CCA' : '#fff'),
        color: disabled ? '#fff' : (isPrimary ? '#FFCB05' : '#666'),
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : (isPrimary ? '0 4px 10px rgba(59, 76, 202, 0.3)' : 'none'),
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
    };

    return (
        <button style={baseStyle} disabled={disabled} {...props}>
            {children}
        </button>
    );
};
