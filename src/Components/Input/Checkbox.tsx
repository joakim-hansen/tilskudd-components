import { ReactElement } from 'react';
import {
    Checkbox as ChakraCheckbox,
    CheckboxGroup,
    FormLabel,
    Stack,
} from '@chakra-ui/react';
import { InputComponentProps } from './SharedTypes';
import { BaseInput } from './BaseInput';

interface CheckboxProps extends InputComponentProps {
    direction?: 'row' | 'column';
    options: string[];
    value: number[];
    onChange: (value: number[]) => void;
}

/* 
    EXAMPLE USE:
    function CheckboxExample(): ReactElement {
        const checkboxOptions: CheckboxOption[] = [
            { label: 'Checkbox Option One', checked: false },
            { label: 'Checkbox Option Two', checked: false },
            { label: 'Checkbox Option Three', checked: false },
        ];
        const [options, setOptions] = useState<CheckboxOption[]>(checkboxOptions);
        return (
            <Checkbox
                title='Checkbox Title'
                direction='column'
                options={options}
                onChange={setOptions}
            />
        );
    }
*/

export function Checkbox(props: CheckboxProps): ReactElement {
    const {
        direction = 'column',
        options,
        value,
        onChange,
        invalidText,
        isDisabled,
        autoFocus,
        isInvalid,
    } = props;

    function handleOnChange(optionIndex: number): void {
        let newValue = [];
        if (value.includes(optionIndex)) {
            newValue = value.filter((e) => e !== optionIndex);
        } else {
            newValue = [...value, optionIndex];
        }
        onChange(newValue);
    }

    return (
        <BaseInput
            {...props}
            isGroup
        >
            <CheckboxGroup>
                <Stack direction={direction}>
                    {options.map((option, index) => {
                        return (
                            <ChakraCheckbox
                                isInvalid={!!invalidText || isInvalid}
                                isDisabled={isDisabled}
                                key={`chk${index}`}
                                onChange={() => handleOnChange(index)}
                                isChecked={value.includes(index)}
                                autoFocus={autoFocus}
                            >
                                {option}
                            </ChakraCheckbox>
                        );
                    })}
                </Stack>
            </CheckboxGroup>
        </BaseInput>
    );
}
