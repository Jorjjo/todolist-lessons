import { JSX } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type ButtonProps = MuiButtonProps & {
    onClick: () => void;
};

export function Button({
    variant = 'contained',
    color = 'primary',
    onClick,
    disabled,
    children,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <MuiButton
            variant={variant}
            color={color}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </MuiButton>
    );
}
