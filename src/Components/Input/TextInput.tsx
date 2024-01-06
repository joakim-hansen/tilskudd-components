import { Input } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { TextInputProps } from './SharedTypes';
import { BaseInput } from './BaseInput';

/* 
    EXAMPLE USE:
    function TextExample(): ReactElement {
        const [text, setText] = useState<string>('');
        return <Text title='Text Title' value={text} onChange={setText} />;
    }
*/

/**
 * Element that allows users enter single valued data.
 * @see — Docs https://chakra-ui.com/docs/components/input
 */
export function TextInput(props: TextInputProps): ReactElement {
    const {
        placeholder,
        onChange,
        value,
        invalidText,
        isDisabled,
        autoFocus,
        isInvalid,
        inputStyles,
    } = props;
    return (
        <BaseInput {...props}>
            <Input
                isInvalid={!!invalidText || isInvalid}
                isDisabled={isDisabled}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                autoFocus={autoFocus}
                sx={inputStyles}
            />
        </BaseInput>
    );
}
