import { JSX } from 'react';

type ButtonProps = {
    title: string;
    onClick: () => void;
};

export function Button({ title, onClick }: ButtonProps): JSX.Element {
    return <button onClick={onClick}>{title}</button>;
}
