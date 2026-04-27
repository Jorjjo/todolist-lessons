import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

type Props = {
    color?: string;
    border?: string;
};

export const NavButton = styled(Button)<Props>(({ color, border }) => ({
    minWidth: '100px',
    borderRadius: '4px',
    textTransform: 'capitalize',
    margin: '0 10px',
}));
