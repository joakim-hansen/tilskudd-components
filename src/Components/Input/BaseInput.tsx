import React, { ReactElement } from 'react';
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
} from '@chakra-ui/react';
import { InputProps } from './SharedTypes';

interface BaseInputProps extends InputProps {
    children: JSX.Element[] | JSX.Element;
    /**
     * If true, will render a `fieldset`. Should only be given by groupable components such as Radio and Checkbox.
     */
    isGroup?: boolean;
}

/**
 * BaseInput acts as a wrapper component for all input components.
 * It provides common layout and styling for input elements.
 * This component is not intended to be used directly in applications.
 *
 * @param props - Properties of the BaseInput component, extending InputProps.
 * @returns A React element representing the base input structure.
 */
export function BaseInput(props: BaseInputProps): ReactElement {
    const {
        label,
        children,
        invalidText,
        captionText,
        isGroup,
        zIndex,
        isInvalid,
        styles,
        labelStyles,
        captionStyles,
        errorStyles,
        inputContainerStyles,
    } = props;
    return (
        <FormControl
            display='flex'
            flexDirection='column'
            as={isGroup ? 'fieldset' : undefined}
            isInvalid={!!invalidText || isInvalid}
            zIndex={zIndex}
            sx={styles}
        >
            {label && (
                <FormLabel
                    fontWeight='bold'
                    color='darkgrey'
                    sx={labelStyles}
                    as={isGroup ? 'legend' : undefined}
                >
                    {label}
                </FormLabel>
            )}
            <Box sx={inputContainerStyles}>{children}</Box>
            {captionText && (
                <FormHelperText
                    color='darkgrey'
                    fontSize='md'
                    sx={captionStyles}
                >
                    {captionText}
                </FormHelperText>
            )}
            {invalidText && (
                <FormErrorMessage color='red' fontSize='md' sx={errorStyles}>
                    {invalidText}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}
