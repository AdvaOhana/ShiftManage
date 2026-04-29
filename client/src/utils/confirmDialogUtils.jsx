import { colors } from '@mui/material';
import { ConfirmDialogColors } from '../theme_params.jsx';
import { Typography } from '@mui/material';

/**
 * Creates a standardized confirmation dialog configuration
 * @param {Object} options - Configuration options
 * @param {string} options.title - Dialog title
 * @param {React.ReactNode} options.description - Dialog description
 * @param {string} options.confirmationText - Text for confirm button
 * @param {string} options.cancellationText - Text for cancel button
 * @param {string} options.type - Dialog type: 'delete', 'warning', or 'info'
 * @returns {Object} - Configuration object for useConfirm
 */
export const createConfirmConfig = ({
    title,
    description,
    confirmationText = 'אישור',
    cancellationText = 'ביטול',
    type = 'info'
}) => {
    const colors = ConfirmDialogColors[type] || ConfirmDialogColors.info;

    return {
        title,
        description,
        confirmationText,
        cancellationText,
        dialogProps: {
            sx: {
                '& .MuiPaper-root': {
                    backgroundColor: colors.backgroundColor,
                }
            }
        },
        confirmationButtonProps: {
            sx: {
                bgcolor: colors.confirmButtonColor,
                mr: 2,
                '&:hover': {
                    bgcolor: colors.confirmButtonColor,
                    opacity: 0.8,
                }
            }
        },
        cancellationButtonProps: {
            sx: {
                color: colors.cancelButtonColor,
                ml: 2,
                '&:hover': {
                    bgcolor: colors.cancelButtonColor,
                    opacity: 0.3,
                }
            }
        }
    };
};

/**
 * Predefined configuration for delete confirmations
 * @param {string} entityName - Name of entity being deleted
 * @param {string} itemName - Specific item being deleted
 * @returns {Object} - Configuration object for useConfirm
 */
export const createDeleteConfirmConfig = (entityName, itemName) => {
    return createConfirmConfig({
        title: 'נא לאשר מחיקה',
        description: (
            <>
                <Typography component="span">
                    <b>
                        האם אתה בטוח שברצונך למחוק את {entityName} {itemName}?
                    </b>
                </Typography>
                <br />
                <Typography component="span">
                    פעולה זו לא ניתנת לביטול.
                </Typography>
            </>
        ),
        confirmationText: 'מחק',
        cancellationText: 'ביטול',
        type: 'delete'
    });
};
/**
 * Predefined configuration for delete confirmations
 * @param {string} MsgTitle - Header of Window
 * @param {string} MsgDesc - message content
 * @returns {Object} - Configuration object for useConfirm
 */
export const createInfoConfirmConfig = (MsgTitle, MsgDesc) => {
    return {
        ...createConfirmConfig({
            title: MsgTitle,
            description: MsgDesc,
            confirmationText: 'הבנתי',
            type: 'info'
        }),
        // Hide the cancellation button
        cancellationButtonProps: {
            style: { display: 'none' }
        },
        // Optional: adjust dialog to be centered since there's only one button
        dialogProps: {
            ...createConfirmConfig({ type: 'info' }).dialogProps,
            sx: {
                '& .MuiPaper-root': {
                    backgroundColor: colors.backgroundColor,
                },
                '& .MuiDialogActions-root': {
                    justifyContent: 'center', // Center the single button
                }
            }
        }
    }
};

