import { Text } from '@chakra-ui/react';
import { Modal } from './Modal';

function DeleteModal(props: {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onSubmit: () => void;
    deleteText?: string | JSX.Element;
    title?: string;
    deleteButtonLabel?: string;
    deleteButtonVariant?: string;
    cancelButtonLabel?: string;
}): JSX.Element {
    const {
        isModalOpen,
        setIsModalOpen,
        onSubmit,
        deleteButtonLabel,
        deleteButtonVariant,
        deleteText,
        title,
        cancelButtonLabel,
    } = props;

    return (
        <Modal
            isModalOpen={isModalOpen}
            title={title || 'Slett'}
            buttons={{
                primary: {
                    label: deleteButtonLabel || 'Slett',
                    variant: deleteButtonVariant || 'delete',
                    onClick: onSubmit,
                },
                secondary: {
                    label: cancelButtonLabel || 'Avbryt',
                    variant: 'secondary',
                    onClick: () => setIsModalOpen(false),
                },
                alignment: 'right',
            }}
            onClose={() => setIsModalOpen(false)}
        >
            {typeof deleteText === 'string' ? (
                <Text>{deleteText}</Text>
            ) : deleteText === undefined ? (
                <Text>
                    Er du sikker på at du vil slette? Du kan ikke angre denne
                    handlingen
                </Text>
            ) : (
                deleteText
            )}
        </Modal>
    );
}

export { DeleteModal };
