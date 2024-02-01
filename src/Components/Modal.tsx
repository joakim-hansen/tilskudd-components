import React, { ReactElement } from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
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
    /**
     * Indicates whether the modal is open or closed.
     */
    isModalOpen: boolean;

    /**
     * An optional icon to display in the modal header. Can be one of the predefined string values or a custom JSX element.
     */
    icon?: 'check' | 'exclamation' | 'edit' | JSX.Element;

    /**
     * The title content of the modal. Can be a string or custom JSX. Rendered as `Heading` if given as a string.
     */
    title?: string | JSX.Element | JSX.Element[];

    /**
     * The subtitle content of the modal. Can be a string or custom JSX. Rendered as `Heading` if given as a string.
     */
    subtitle?: string | JSX.Element | JSX.Element[];

    /**
     * Optional content to be displayed in the modal body. Can be a single JSX element or an array of JSX elements.
     */
    children?: JSX.Element[] | JSX.Element;

    /**
     * Configuration for primary and secondary buttons in the modal. If given, renders a default button setup.
     */
    buttons?: ModalButtons;

    /**
     * Function to call when the modal needs to be closed.
     */
    onClose: () => void;

    /**
     * An optional error message to display in the modal. Will only work when the modal is also given a `buttons` object.
     */
    errorMessage?: string;

    /**
     * Optional Chakra UI style props to customize the modal.
     */
    styles?: SystemStyleObject;
};

type ModalButtons = {
    /**
     * The primary button's configuration.
     */
    primary: ModalButton;

    /**
     * An optional secondary button's configuration. If not given an `onClick`, will call the `onClose` passed to the modal.
     */
    secondary?: ModalButton;

    /**
     * The alignment of the buttons within the modal. Can be either 'right' or 'left', defaults to 'right' if not given.
     */
    alignment?: 'right' | 'left';
};

type ModalButton = {
    /**
     * The text label displayed on the button.
     */
    label: string;

    /**
     * The variant of the button. Must be default Chakra value or defined in theme.
     */
    variant: string;

    /**
     * An optional click handler for the button.
     */
    onClick?: () => void;
};

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

/**
 * Renders buttons inside the modal.
 *
 * This component handles the rendering of primary and secondary buttons in the modal,
 * including their alignment and actions. It also optionally displays an error message.
 *
 * @param {object} props - The properties for the Buttons component.
 * @param {ModalButtons} props.buttons - The configuration for the buttons to be rendered.
 * @param {() => void} props.onClose - The function to call when the modal needs to be closed.
 * @param {string} [props.errorMessage] - An optional error message to be displayed in the modal.
 * @returns {ReactElement} - A React element representing the set of buttons in the modal.
 */
function Buttons(props: {
    buttons: ModalButtons;
    onClose: () => void;
    errorMessage?: string;
}) {
    const { buttons, onClose, errorMessage } = props;
    const { primary, secondary, alignment } = buttons;
    return (
        <Box padding='0 24px 24px 24px'>
            {(!alignment || alignment === 'right') && (
                <Flex justify='end'>
                    {secondary && (
                        <Button
                            variant={secondary.variant}
                            onClick={secondary.onClick ?? onClose}
                        >
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
                        <Button
                            variant={secondary.variant}
                            onClick={secondary.onClick ?? onClose}
                        >
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

/**
 * Represents a modal dialog component.
 *
 * This component displays a modal dialog with various customizable properties like
 * title, subtitle, icons, and buttons. It can be used to present information to the user or to get user inputs.
 *
 * @param {ModalProps} props - The properties passed to the Modal component.
 * @returns {ReactElement} - A React element representing the modal dialog.
 */
export function Modal(props: ModalProps): ReactElement {
    const {
        isModalOpen,
        icon,
        title,
        subtitle,
        children,
        buttons,
        onClose,
        errorMessage,
        styles,
    } = props;

    return (
        <ChakraModal isOpen={isModalOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent sx={styles}>
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
