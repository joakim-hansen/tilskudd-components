import React, { ReactElement } from 'react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { BaseInput } from './BaseInput';
import { InputComponentProps } from './SharedTypes';

interface CheckboxToggleProps extends InputComponentProps {
    value: boolean;
    onChange: (value: boolean) => void;
    valueLabel?: string;
}

export function CheckboxToggle(props: CheckboxToggleProps): ReactElement {
    const { value, onChange, valueLabel, ...otherProps } = props;

    return (
        <BaseInput {...otherProps}>
            <ChakraCheckbox
                isChecked={value}
                onChange={(e) => onChange(e.target.checked)}
            >
                {valueLabel}
            </ChakraCheckbox>
        </BaseInput>
    );
}
