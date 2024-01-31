import React, { ReactElement } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    useStyleConfig,
    SystemStyleObject,
} from '@chakra-ui/react';

type CardProps = {
    /**
     * The title of the card, displayed prominently at the top.
     */
    title: string;

    /**
     * The main content of the card. Can be a string, JSX element, or an array of JSX elements.
     */
    content?: string | JSX.Element | JSX.Element[];

    /**
     * An optional React element to display as an icon alongside the title.
     */
    titleIcon?: ReactElement;

    /**
     * An optional React element to display as an action icon, typically at the bottom or corner of the card.
     */
    actionIcon?: ReactElement;

    /**
     * Custom styles to apply to the card component.
     */
    styles?: SystemStyleObject;

    /**
     * Custom styles for the title element within the card.
     */
    titleStyles?: SystemStyleObject;

    /**
     * An optional click handler for the card.
     */
    onClick?: () => void;

    /**
     * Optional Aria label for accessibility, defaults to the title if not provided.
     */
    ariaLabel?: string;

    /**
     * Optional variant used find correct styles from theme config
     */
    variant?: string;
};

function Card(props: CardProps): ReactElement {
    const {
        title,
        content,
        titleIcon,
        actionIcon,
        styles,
        titleStyles,
        onClick,
        ariaLabel,
        variant,
    } = props;

    const cardStyles = useStyleConfig('Card', { variant: variant });

    /**
     * Represents a Card component, typically used to display a piece of information in a well-defined block.
     *
     */
    return (
        <Box
            as='button'
            onClick={onClick}
            sx={{ ...cardStyles, ...styles }}
            aria-label={ariaLabel || title}
        >
            <Flex direction='column' justify='space-between'>
                <Flex width='100%' direction='row' align='center'>
                    {titleIcon}
                    <Heading size='md' marginLeft='0.5rem' sx={titleStyles}>
                        {title}
                    </Heading>
                </Flex>
                {typeof content === 'string' ? (
                    <Flex
                        width='100%'
                        direction='row'
                        alignContent='center'
                        justify='space-between'
                        margin='0.5rem 0.25rem 0 0'
                    >
                        <Text textAlign='left'>{content}</Text>
                        {actionIcon && actionIcon}
                    </Flex>
                ) : (
                    <>{content}</>
                )}
            </Flex>
        </Box>
    );
}

export { Card };
