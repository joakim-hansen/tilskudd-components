/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, ReactNode } from 'react';
import {
    Alert as ChakraAlert,
    AlertIcon,
    AlertDescription,
    CloseButton,
    Spacer,
    Stack,
    Link,
    Icon,
    IconProps,
    useStyleConfig,
    SystemStyleObject,
} from '@chakra-ui/react';

/**
 * Properties for the Alert component.
 */
type AlertProps = {
    /**
     * The status of the alert, which determines its color and icon.
     * - 'info': blue color, typically used for informational alerts.
     * - 'warning': orange color, used for warnings that might need attention.
     * - 'error': red color, indicates an error or problem.
     * - 'success': green color, represents a successful or positive action.
     */
    status: 'info' | 'warning' | 'error' | 'success';

    /**
     * The descriptive text that appears in the alert.
     * If not provided, the alert will not include a description.
     */
    description?: string;

    /**
     * A callback function that is called when the alert is closed.
     * If not provided, the alert will not be dismissible.
     */
    onClose?: () => void;

    /**
     * Object containing the text and href of a hyperlink that can be included in the alert.
     * Optionally contains isExternal; whether or not the link is external
     */
    link?: { text: string; href: string; isExternal?: boolean };

    /**
     * The URL that the hyperlink points to.
     If not provided along with a `linkText`, no link will be shown.
     */
    linkHref?: string;

    /**
     * Indicates whether the link should open in a new tab/window.
     * Defaults to 'false' if not provided.
     */
    linkIsExternal?: boolean;

    /**
     * Custom styles for the Alert
     */
    styles?: SystemStyleObject;

    /**
     * The content to be rendered inside the alert, typically text or React components.
     */
    children?: ReactNode;

    /**
     * The variant of the alert, which can be used to apply different styles or behaviors.
     * The specific variants available depend on the implementation of the Alert component.
     */
    variant?: string;
};

function InfoIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d='M0 0h24v24H0z' fill='none' />
            <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
                fill='currentColor'
            />
        </Icon>
    );
}

function CheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z'
                fill='currentColor'
            />
        </Icon>
    );
}

function ErrorIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z'
                fill='currentColor'
            />
        </Icon>
    );
}

/**
 * Alert is used to communicate the state or status of a page, feature or action

@see — Docs https://chakra-ui.com/docs/components/alert

@see — WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
function Alert(props: AlertProps): ReactElement {
    const { status, description, onClose, link, children, variant, styles } =
        props;

    const alertStyles = useStyleConfig('Alert');

    return (
        <ChakraAlert
            status={status}
            variant={variant || status}
            sx={styles ? { ...alertStyles, ...styles } : alertStyles}
        >
            <AlertIcon
                as={
                    status === 'info'
                        ? InfoIcon
                        : status === 'success'
                        ? CheckIcon
                        : ErrorIcon
                }
            />
            <Stack px='28px'>
                <AlertDescription
                    wordBreak='break-word'
                    style={{ hyphens: 'auto' }}
                >
                    {description}
                    {children}
                </AlertDescription>
                {link && (
                    <Link href={link.href} isExternal={link.isExternal}>
                        {link.text}
                    </Link>
                )}
            </Stack>
            <Spacer />
            {onClose && (
                <CloseButton
                    position='absolute'
                    right='8px'
                    top='8px'
                    onClick={onClose}
                />
            )}
        </ChakraAlert>
    );
}

export { Alert };
