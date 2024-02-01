import React, { ReactElement } from 'react';
import { Checkbox as ChakraCheckbox, CheckboxGroup } from '@chakra-ui/react';
import { BaseInput } from './BaseInput';
import { InputComponentProps } from './SharedTypes';

interface CheckboxToggleProps extends InputComponentProps {
    value: boolean;
    onChange: (value: boolean) => void;
    valueLabel?: string;
}

export function CheckboxToggle(props: CheckboxToggleProps): ReactElement {
    const { value, onChange, valueLabel, invalidText, isDisabled, autoFocus } =
        props;

    return (
        <BaseInput {...props} isGroup>
            <CheckboxGroup>
                <ChakraCheckbox
                    isChecked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    isInvalid={!!invalidText}
                    isDisabled={isDisabled}
                    autoFocus={autoFocus}
                >
                    {valueLabel}
                </ChakraCheckbox>
            </CheckboxGroup>
        </BaseInput>
    );
}
