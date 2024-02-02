import React from 'react';
import {
    Center,
    Heading,
    Spinner as ChakraSpinner,
    Text,
    VStack,
    SystemStyleObject,
    useStyleConfig,
    Box,
} from '@chakra-ui/react';

function Spinner(props: {
    text?: string;
    header?: string;
    styles?: SystemStyleObject;
    variant?: string;
}) {
    const { text, header, styles, variant } = props;
    const spinnerStyles = useStyleConfig('ComposedSpinner', {
        variant: variant,
    });

    return (
        <Center>
            <Box sx={{ ...spinnerStyles, ...styles }}>
                <VStack>
                    {header && (
                        <Heading size='md' mb='0.5rem'>
                            {header}
                        </Heading>
                    )}
                    {text && <Text mb='0.5rem'>{text}</Text>}
                    <ChakraSpinner size='lg' color='blue' />
                </VStack>
            </Box>
        </Center>
    );
}

export { Spinner };
