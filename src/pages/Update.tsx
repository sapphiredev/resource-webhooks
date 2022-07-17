import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { sendWebhookMessage } from '../api/send-webhook-message';
import UpdateOrPostContent from '../components/UpdateOrPostContent';
import WebhookFailedToPostMessage from '../components/Snackbars/WebhookFailedToPostMessage';
import type { Update } from '../models/UpdateModel';
import { postSchema } from '../validations/postSchema';

interface UpdatePageProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UpdatePage: FC<UpdatePageProps> = ({ setIsLoading }) => {
	const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

	const formHookMethods = useForm<Update>({
		resolver: yupResolver(postSchema),
		mode: 'all',
		defaultValues: {
			webhookUrl: '',
			text: '',
			messageId: '',
			mentionRole: false,
			role: null
		}
	});

	const handleSubmit: SubmitHandler<Update> = async (data) => {
		try {
			setIsLoading(true);
			await sendWebhookMessage(data, 'update');

			formHookMethods.resetField('text');

			enqueueSnackbar('Successfully updated Webhook message!', { variant: 'success' });
			setReviewDialogOpen(false);
		} catch (error) {
			enqueueSnackbar(WebhookFailedToPostMessage(), {
				variant: 'error'
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box sx={{ mt: 2 }}>
			<FormProvider {...formHookMethods}>
				<form onSubmit={formHookMethods.handleSubmit(handleSubmit)}>
					<UpdateOrPostContent type="update" reviewDialogOpen={reviewDialogOpen} setReviewDialogOpen={setReviewDialogOpen} />
				</form>
			</FormProvider>
		</Box>
	);
};

export default UpdatePage;
