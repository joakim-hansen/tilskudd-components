import React from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    SystemStyleObject,
    useStyleConfig,
} from '@chakra-ui/react';
import { Spinner } from './Spinner';

function OverlaySpinner(props: {
    isActive: boolean;
    text?: string;
    styles?: SystemStyleObject;
    spinnerStyles?: SystemStyleObject;
    variant?: string;
    spinnerVariant?: string;
    onClose?: Function;
}) {
    const {
        isActive,
        text,
        spinnerStyles,
        styles,
        variant,
        onClose,
        spinnerVariant,
    } = props;

    const overlaySpinnerStyles = useStyleConfig('OverlaySpinner', {
        variant: variant,
    });

    return (
        <ChakraModal
            isOpen={isActive}
            onClose={onClose ? () => onClose() : () => null}
            isCentered
        >
            <ModalOverlay />
            <ModalContent
                sx={
                    styles
                        ? { ...overlaySpinnerStyles, ...styles }
                        : overlaySpinnerStyles
                }
            >
                <ModalBody>
                    <Spinner
                        styles={spinnerStyles}
                        header={text}
                        variant={spinnerVariant}
                    />
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    );
}

export { OverlaySpinner };
