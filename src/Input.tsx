import { ChangeEvent } from 'react';

type Props = {
    taskTitle: string;
    onChange: (taskTitle: string) => void;
    onEnter: () => void;
};

export function Input(props: Props) {
    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value);
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
            value={props.taskTitle}
            onChange={handleOnChangeInput}
            onKeyDown={handleOnEnterInput}
        ></input>
    );
}
