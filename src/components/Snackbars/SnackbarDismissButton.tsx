import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { SnackbarKey } from 'notistack';
import type { FC } from 'react';

interface SnackbarDismissButtonProps {
	snackbarKey: SnackbarKey;
}

const SnackbarDismissButton: FC<SnackbarDismissButtonProps> = ({ snackbarKey }) => (
	<IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={() => closeSnackbar(snackbarKey)}>
		<CloseIcon />
	</IconButton>
);

export default SnackbarDismissButton;