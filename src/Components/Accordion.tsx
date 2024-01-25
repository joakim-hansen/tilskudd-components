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
    ExpandedIndex,
} from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

type AccordionProps = {
    allowMultiple?: boolean;
    isAllDefaultOpen?: boolean;
    items: AccordionItem[];
    defaultIndex?: ExpandedIndex;
    onChange?: (value: ExpandedIndex) => void;
    index?: ExpandedIndex;
    width?: string;
    isSubAccordion?: boolean;
    panelBackgroundColor?: string;
};

type AccordionItem = {
    title: string | JSX.Element[] | JSX.Element;
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
    const {
        items,
        allowMultiple,
        isAllDefaultOpen,
        defaultIndex,
        onChange,
        index,
        width,
        isSubAccordion,
        panelBackgroundColor,
    } = props;
    return (
        <ChakraAccordion
            style={{ overflow: 'visible' }}
            allowMultiple={allowMultiple || isAllDefaultOpen}
            defaultIndex={defaultIndex !== undefined ? defaultIndex : 0}
            backgroundColor='white'
            allowToggle
            width={width || '100%'}
            onChange={
                onChange
                    ? (e) => {
                          onChange(e);
                      }
                    : undefined
            }
            index={index !== undefined ? index : undefined}
        >
            {items.map((accordionItem, index) => {
                return (
                    <AccordionItem
                        key={`aci${index}`}
                        backgroundColor={panelBackgroundColor || ''}
                    >
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton
                                        minHeight={
                                            isSubAccordion ? '50px' : '62'
                                        }
                                        _expanded={{ background: 'lightblue' }}
                                        backgroundColor={'white'}
                                    >
                                        <Box flex='1' textAlign='left'>
                                            <Stack
                                                spacing='0px'
                                                direction='column'
                                            >
                                                {typeof accordionItem.title ===
                                                'string' ? (
                                                    <Heading
                                                        size='md'
                                                        color='blue'
                                                        fontWeight={
                                                            isSubAccordion
                                                                ? 'normal'
                                                                : 'bold'
                                                        }
                                                        fontSize={
                                                            isSubAccordion
                                                                ? '16px'
                                                                : '20px'
                                                        }
                                                    >
                                                        {accordionItem.title}
                                                    </Heading>
                                                ) : (
                                                    accordionItem.title
                                                )}
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
                                </h2>
                                <AccordionPanel mt={1} pb={4}>
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
