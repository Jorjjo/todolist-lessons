import { ChangeEvent, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createItemContainerSx } from './CreateItemForm.styles';

type CreateItemFormProps = {
    createItem: (title: string) => void;
    maxTitleLength: number;
};

export function CreateItemForm({
    createItem,
    maxTitleLength,
}: CreateItemFormProps) {
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
                createItem(trimmedTitle);
                setItemTitle('');
                break;
        }
    };

    const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value);
        setError(null);
    };

    const handleOnEnterInput = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            handleCreateItem();
        }
    };
    return (
        <Box sx={createItemContainerSx}>
            <TextField
                error={!!error} //если в error 'some string'(т.е текст какой-то ошибки) => !!'some string' === true => error=true
                //  если в error null(т.е нет никакой ошибки) => !!null === false => error=false
                label={'Enter a title'}
                variant={'outlined'}
                size='small'
                helperText={error}
                value={itemTitle}
                onChange={handleOnChangeInput}
                onKeyDown={handleOnEnterInput}
                onBlur={() => {
                    setError(null);
                }}
            />
            <IconButton
                color={'primary'}
                disabled={itemTitle === ''}
                onClick={() => {
                    handleCreateItem();
                }}
            >
                <AddBoxIcon />
            </IconButton>
        </Box>
    );
}
