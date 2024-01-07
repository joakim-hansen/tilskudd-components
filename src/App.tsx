import { ChakraProvider } from '@chakra-ui/react';
import {
    Alert,
    Accordion,
    TextInput,
    TextAreaInput,
    NumberInput,
    Tabs,
    Radio,
} from 'Components';
import { styles } from 'Theme';
import { useState } from 'react';

function Divider(props: { title: string }) {
    return (
        <div
            style={{
                backgroundColor: 'pink',
                width: '100%',
                marginTop: '2.5rem',
                marginBottom: '2.5rem',
            }}
        >
            <h2>{props.title}</h2>
        </div>
    );
}

function App() {
    const accordionItems = [
        { title: 'Accordion One', content: <div>Accordion One Content</div> },
        { title: 'Accordion Two', content: <div>Accordion Two Content</div> },
    ];

    const [textValue, setTextValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [numberValue, setNumberValue] = useState();

    const [radioOption, setRadioOption] = useState<string>();

    const radioOptions = [
        { value: 'first', label: 'Radio Option One' },
        { value: 'second', label: 'Radio Option Two' },
        { value: 'disabled', label: 'Disabled Radio Option', isDisabled: true },
    ];

    const inputFieldStyles = { width: '25rem' };

    function radioValueLabelDisplayer(option: string | undefined) {
        if (option === undefined) return 'undefined';
        const knownValue = radioOptions.find((o) => o.value === option);
        return knownValue ? knownValue.label : 'undefined';
    }

    const tabItems = [
        {
            title: 'Text Inputs',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='TextInput' />
                    <TextInput
                        value={textValue}
                        onChange={setTextValue}
                        label='TextInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof textValue}</div>
                    <div>{textValue}</div>
                    <Divider title='TextArea' />
                    <TextAreaInput
                        value={textAreaValue}
                        onChange={setTextAreaValue}
                        label='TextAreaInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof textAreaValue}</div>
                    <div>{textAreaValue}</div>
                    <Divider title='NumberInput' />
                    <NumberInput
                        value={numberValue}
                        onChange={setNumberValue}
                        label='NumberInput'
                        styles={inputFieldStyles}
                    />
                    <div>Value: {typeof numberValue}</div>
                    <div>{numberValue}</div>
                    <Divider title='NumberInput (Currency)' />
                    <NumberInput
                        value={numberValue}
                        onChange={setNumberValue}
                        label='NumberInput (Currency)'
                        styles={inputFieldStyles}
                        isCurrency
                    />
                    <div>Value: {typeof numberValue}</div>
                    <div>{numberValue}</div>
                </div>
            ),
        },
        {
            title: 'Non-input',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='Alert' />
                    <Alert status='error'>Zoopi doopy</Alert>
                    <Divider title='Accordion' />
                    <Accordion items={accordionItems} />
                </div>
            ),
        },
        {
            title: 'Multi inputs',
            children: (
                <div style={{ width: '80vw' }}>
                    <Divider title='Radio' />
                    <Radio
                        options={radioOptions}
                        value={radioOption}
                        onChange={setRadioOption}
                    />
                    <div>Radio value: {radioOption}</div>
                    <div>
                        Label of radio value:{' '}
                        {radioValueLabelDisplayer(radioOption)}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <ChakraProvider theme={styles}>
            <div style={{ marginLeft: '2rem', width: '100vw' }}>
                <Tabs tabs={tabItems} />
            </div>
        </ChakraProvider>
    );
}

export default App;
