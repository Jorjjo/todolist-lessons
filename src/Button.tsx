import { JSX } from 'react';

type ButtonProps = {
    title: string;
    onClick: () => void;
    isDisabled?: boolean;
    className?: string;
};

export function Button({
    title,
    onClick,
    isDisabled,
    className,
}: ButtonProps): JSX.Element {
    return (
        <button className={className} disabled={isDisabled} onClick={onClick}>
            {title}
        </button>
    );
}
