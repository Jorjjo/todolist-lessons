import { ChangeEvent } from 'react';

type Props = {
    className: string;
    taskTitle: string;
    onChange: (taskTitle: string) => void;
    onEnter: () => void;
    setError: (error: string | null) => void;
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
            className={props.className}
            value={props.taskTitle}
            onChange={handleOnChangeInput}
            onKeyDown={handleOnEnterInput}
        ></input>
    );
}
