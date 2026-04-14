import { ChangeEvent } from 'react';

type Props = {
    className: string;
    value: string;
    onChange: (taskTitle: string) => void;
    onEnter: () => void;
    setError: (error: string | null) => void;
    autofocus?: boolean;
    onBlur?: () => void;
};

export function Input(props: Props) {
    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value);
        props.setError(null);
    };

    const handleOnEnterInput = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            props.onEnter();
        }
    };
    return (
        <input
            onBlur={props.onBlur}
            autoFocus={props.autofocus}
            className={props.className}
            value={props.value}
            onChange={handleOnChangeInput}
            onKeyDown={handleOnEnterInput}
        ></input>
    );
}
