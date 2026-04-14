import { useState } from 'react';
import { Input } from './Input';

type Props = {
    status?: boolean;
    value: string;
    onTitleChange: (title: string) => void;
    maxTitleLength: number;
};

export function EditableSpan({
    status,
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

    return (
        <>
            {isEditMode ? (
                <Input
                    className={error ? 'error' : ''}
                    value={title}
                    autofocus={true}
                    onBlur={handleChangeTask}
                    onEnter={handleChangeTask}
                    onChange={setTitle}
                    setError={setError}
                />
            ) : (
                <span
                    onDoubleClick={turnOnEditMode}
                    className={status ? 'task-done' : 'task'}
                >
                    {value}
                </span>
            )}
            {error && <div className='error-message'>{error}</div>}
        </>
    );
}
