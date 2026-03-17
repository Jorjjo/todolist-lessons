import { JSX } from 'react';

type ButtonProps = {
    title: string;
    onClick: () => void;
    isDisabled?: boolean;
};

export function Button({ title, onClick, isDisabled}: ButtonProps): JSX.Element {
    return <button disabled={isDisabled} onClick={onClick}>{title}</button>;
}
