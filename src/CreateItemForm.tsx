import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

type CreateItemFormProps = {
    сreateItem: (title: string) => void;
    maxTitleLength: number;
};

export function CreateItemForm({ сreateItem, maxTitleLength }: CreateItemFormProps) {
    const [itemTitle, setItemTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const trimmedTitle = itemTitle.trim();
    const isTitleLengthValid = itemTitle.length <= maxTitleLength;

    const handleCreateItem = () => {
        switch (true) {
            case trimmedTitle === '':
                setError('Title is required');
                break;
            case !isTitleLengthValid:
                setError('Title is too long');
                break;
            default:
                сreateItem(trimmedTitle);
                setItemTitle('');
                break;
        }
    };
    return (
        <div>
            <Input
                className={error ? 'error' : ''}
                value={itemTitle}
                onChange={setItemTitle}
                onEnter={handleCreateItem}
                setError={setError}
            />
            <Button
                title='+'
                isDisabled={itemTitle === ''}
                onClick={() => {
                    handleCreateItem();
                }}
            />
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
}
