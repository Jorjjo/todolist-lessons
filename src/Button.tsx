import { JSX } from 'react';

type ButtonProps = {
    title: string;
};

export function Button({ title }: ButtonProps): JSX.Element {
    return <button>{title}</button>;
}
