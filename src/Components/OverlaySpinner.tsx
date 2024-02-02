import React from 'react';
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    SystemStyleObject,
    useStyleConfig,
    Center,
    Heading,
    Spinner as ChakraSpinner,
    Text,
    VStack,
    Box,
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
    const { isActive, text, styles, variant, onClose, spinnerVariant } = props;

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
                    <Center>
                        <VStack>
                            {text && (
                                <Heading size='md' mb='0.5rem'>
                                    {text}
                                </Heading>
                            )}
                            <ChakraSpinner variant={spinnerVariant} />
                        </VStack>
                    </Center>
                </ModalBody>
            </ModalContent>
        </ChakraModal>
    );
}

export { OverlaySpinner };
