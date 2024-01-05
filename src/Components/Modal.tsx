import { ReactElement } from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Text,
    IconProps,
    SystemStyleObject,
} from '@chakra-ui/react';

type ModalProps = {
    isModalOpen: boolean;
    icon?: 'check' | 'exclamation' | 'edit' | JSX.Element;
    title?: string | JSX.Element[];
    subtitle?: string | JSX.Element | JSX.Element[];
    children?: JSX.Element[] | JSX.Element;
    buttons?: ModalButtons;
    hasCloseButton?: boolean;
    onClose: () => void;
    errorMessage?: string;
    /** @deprecated Don't use this prop. Use styles object instead */
    width?: string;
    styles?: SystemStyleObject;
};

type ModalButtons = {
    primary: ModalButton;
    secondary?: ModalButton;
    alignment: 'right' | 'left';
};

type ModalButton = {
    label: string;
    variant: string;
    onClick?: () => void;
};

/* 
    EXAMPLE USE:
    function ModalExample(): ReactElement {
        const [modalOpen, setmodalOpen] = useState<boolean>(false);
        function submitFunction(): void {
            alert('You have pressed the primary button succesfully');
        }
        const primary = {
            label: 'Primary button',
            variant: 'primary',
            onClick: submitFunction,
        };

        const secondary = {
            label: 'Secondary',
            variant: 'secondary,
        };

        const buttons = {
            primary,
            secondary,
            alignment: 'left',
        };

        return (
            <div>
                <Button onClick={() => setmodalOpen(true)}>Open the modal!</Button>
                <Modal
                    buttons={buttons}
                    isModalOpen={modalOpen}
                    title='The modal may have a title'
                    onClose={() => setmodalOpen(false)}
                >
                    <div>This is the modal content (children)</div>
                </Modal>
            </div>
        );
    }
*/

function ExclamationIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx={12} cy={19} r={2} fill='currentColor' />
            <path
                d='M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z'
                fill='currentColor'
            />
        </Icon>
    );
}

function CheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                d='M9 16.17 5.53 12.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L9 16.17z'
                fill='currentColor'
            />
        </Icon>
    );
}

function EditIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                d='M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
                fill='currentColor'
            />
        </Icon>
    );
}

function Buttons(props: {
    buttons: ModalButtons;
    onClose: () => void;
    errorMessage?: string;
}) {
    const { buttons, onClose, errorMessage } = props;
    const { primary, secondary, alignment } = buttons;
    return (
        <Box padding='0 24px 24px 24px'>
            {alignment === 'right' && (
                <Flex justify='end'>
                    {secondary && (
                        <Button variant={secondary.variant} onClick={onClose}>
                            {secondary.label}
                        </Button>
                    )}
                    <Button
                        marginEnd='0px'
                        variant={primary.variant}
                        onClick={primary.onClick}
                    >
                        {primary.label}
                    </Button>
                </Flex>
            )}
            {alignment === 'left' && (
                <Flex justify='start'>
                    <Button variant={primary.variant} onClick={primary.onClick}>
                        {primary.label}
                    </Button>
                    {secondary && (
                        <Button variant={secondary.variant} onClick={onClose}>
                            {secondary.label}
                        </Button>
                    )}
                </Flex>
            )}
            {errorMessage && (
                <Text
                    paddingTop='16px'
                    color='red'
                    textAlign={
                        alignment === 'right'
                            ? 'end'
                            : alignment === 'left'
                            ? 'start'
                            : 'center'
                    }
                >
                    {errorMessage}
                </Text>
            )}
        </Box>
    );
}

export function Modal(props: ModalProps): ReactElement {
    const {
        isModalOpen,
        icon,
        title,
        subtitle,
        children,
        buttons,
        onClose,
        hasCloseButton,
        errorMessage,
        width,
        styles,
    } = props;

    return (
        <ChakraModal isOpen={isModalOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW={width} sx={styles}>
                <ModalHeader>
                    <Flex width='100%' direction='row'>
                        {typeof icon === 'string' ? (
                            <Icon
                                as={
                                    icon === 'check'
                                        ? CheckIcon
                                        : icon === 'exclamation'
                                        ? ExclamationIcon
                                        : EditIcon
                                }
                                color='blue'
                                backgroundColor='lightblue'
                                borderRadius='100%'
                                padding='8px'
                                marginRight='8px'
                                boxSize={10}
                            />
                        ) : (
                            icon
                        )}

                        <Flex direction='column'>
                            {typeof title === 'string' ? (
                                <Heading size='md' marginBottom='8px'>
                                    {title}
                                </Heading>
                            ) : (
                                title
                            )}
                            {typeof subtitle === 'string' ? (
                                <Heading size='sm' fontWeight='normal'>
                                    {subtitle}
                                </Heading>
                            ) : (
                                subtitle
                            )}
                        </Flex>
                    </Flex>
                </ModalHeader>
                {hasCloseButton && <ModalCloseButton />}
                <ModalBody>{children}</ModalBody>
                {buttons && (
                    <Buttons
                        buttons={buttons}
                        errorMessage={errorMessage}
                        onClose={onClose}
                    />
                )}
            </ModalContent>
        </ChakraModal>
    );
}
