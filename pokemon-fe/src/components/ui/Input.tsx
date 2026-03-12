import React, { type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    containerStyle?: React.CSSProperties;
    rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ containerStyle, style, rightElement, onFocus, onBlur, ...props }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div style={{
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '5px 15px',
            boxShadow: isFocused ? '0 0 0 3px rgba(59, 76, 202, 0.2)' : '0 4px 15px rgba(0,0,0,0.05)',
            border: isFocused ? '2px solid #3B4CCA' : '2px solid transparent',
            transition: 'all 0.3s ease',
            ...containerStyle
        }}>
            <input
                onFocus={(e) => {
                    setIsFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    onBlur?.(e);
                }}
                style={{
                    border: 'none',
                    outline: 'none',
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    backgroundColor: 'transparent',
                    ...style
                }}
                {...props}
            />
            {rightElement && (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    {rightElement}
                </div>
            )}
        </div>
    );
};
