import { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type Props = {
    value: string;
    onTitleChange: (title: string) => void;
    maxTitleLength: number;
};

export function EditableSpan({
    value,
    onTitleChange,
    maxTitleLength,
}: Props) {
    const [title, setTitle] = useState(value);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const turnOnEditMode = () => {
        setIsEditMode(true);
    };

    const trimmedTitle = title.trim();
    const isTitleLengthValid = title.length <= maxTitleLength;

    const handleChangeTask = () => {
        switch (true) {
            case trimmedTitle === '':
                setError('Title is required');
                break;
            case !isTitleLengthValid:
                setError('Title is too long');
                break;
            default:
                setIsEditMode(false);
                onTitleChange(title);
                break;
        }
    };

    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(null);
    };

    const handleOnEnterInput = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleChangeTask();
        }
    };

    return (
        <>
            {isEditMode ? (
                <TextField
                    variant={'outlined'}
                    size='small'
                    value={title}
                    autoFocus
                    onBlur={handleChangeTask}
                    onKeyDown={handleOnEnterInput}
                    onChange={handleOnChangeInput}
                    helperText={error}
                    error={!!error}
                />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
}
