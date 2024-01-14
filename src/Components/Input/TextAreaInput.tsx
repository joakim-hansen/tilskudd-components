import { Textarea } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { TextInputProps } from './SharedTypes';
import { BaseInput } from './BaseInput';

/* 
    EXAMPLE USE:
    function TextAreaExample(): ReactElement {
        const [text, setText] = useState<string>('');
        return (
            <TextArea
                title='Text Area Title'
                value={text}
                placeholder='Placeholder text is optional'
                onChange={setText}
            />
        );
    }
*/

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see — Docs https://chakra-ui.com/textarea
 */
export function TextAreaInput(props: TextInputProps): ReactElement {
    const {
        placeholder,
        onChange,
        value,
        invalidText,
        isDisabled,
        autoFocus,
        isInvalid,
        inputStyles,
        ariaLabel,
    } = props;
    return (
        <BaseInput {...props}>
            <Textarea
                isInvalid={!!invalidText || isInvalid}
                isDisabled={isDisabled}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                autoFocus={autoFocus}
                sx={inputStyles}
                errorBorderColor='transparent'
                focusBorderColor='transparent'
                aria-label={ariaLabel}
            />
        </BaseInput>
    );
}
