import React, { ReactElement, useMemo } from 'react';
import {
    Accordion as ChakraAccordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    Badge,
    Stack,
    Heading,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

type AccordionProps = {
    allowMultiple?: boolean;
    isAllDefaultOpen?: boolean;
    items: AccordionItem[];
};

type AccordionItem = {
    title: string;
    content: JSX.Element[] | JSX.Element;
};

/* 
    EXAMPLE USE: 
    function AccordionExample(): ReactElement {
        const accordionItems = [
            {
                title: 'First accordion',
                content: <div>This is the first accordions content</div>,
            },
            {
                title: 'Second accordion',
                content: <div>This is the second accordions content</div>,
            },
            {
                title: 'Third accordion',
                content: <div>This is the third accordions content</div>,
            },
        ];
        return (
            <div>
                <Accordion items={accordionItems} allowMultiple />
            </div>
        );
    }
*/

export function Accordion(props: AccordionProps): ReactElement {
    const { items, allowMultiple, isAllDefaultOpen } = props;

    const indexesDefaultOpen: number[] = useMemo(() => {
        if (isAllDefaultOpen) {
            return items.map((_, index) => index);
        }
        return [];
    }, [items, isAllDefaultOpen]);

    return (
        <ChakraAccordion
            allowMultiple={allowMultiple || isAllDefaultOpen}
            defaultIndex={indexesDefaultOpen}
            allowToggle
        >
            {items.map((accordionItem, index) => {
                return (
                    <AccordionItem key={`aci${index}`}>
                        {({ isExpanded }) => (
                            <>
                                <Heading as='h2'>
                                    <AccordionButton
                                        height='62px'
                                        _expanded={{ background: 'lightblue' }}
                                    >
                                        <Box flex='1' textAlign='left'>
                                            <Stack
                                                spacing='0px'
                                                direction='column'
                                            >
                                                <Heading size='md' color='blue'>
                                                    {accordionItem.title}
                                                </Heading>
                                            </Stack>
                                        </Box>
                                        {isExpanded ? (
                                            <ArrowUpIcon
                                                fontSize='24px'
                                                color='blue'
                                            />
                                        ) : (
                                            <ArrowDownIcon
                                                fontSize='24px'
                                                color='blue'
                                            />
                                        )}
                                    </AccordionButton>
                                </Heading>
                                <AccordionPanel pb={4}>
                                    {accordionItem.content}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                );
            })}
        </ChakraAccordion>
    );
}
