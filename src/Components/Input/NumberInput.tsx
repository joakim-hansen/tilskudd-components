import { Input } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { InputComponentProps } from './SharedTypes';
import { BaseInput } from './BaseInput';

/* 
    EXAMPLE USE: 
    function NumberExample(): ReactElement {
        const [num, setNum] = useState<string>('');
        return <Number title='Number Title' value={num} onChange={setNum} />;
    }
*/

interface NumberInputProps extends InputComponentProps {
    /**
     * Placeholder text displayed in the input when it is empty.
     */
    placeholder?: string;

    /**
     * If true, allows negative values to be entered.
     */
    allowNegative?: boolean;

    /**
     * The current value of the input, can be a number, string, or undefined.
     */
    value: number | string | undefined;

    /**
     * Callback function called when the input value changes.
     * @param value - The new value of the input.
     */
    onChange:
        | ((value: number) => void)
        | ((value: string) => void)
        | ((value: undefined) => void);

    /**
     * The maximum value allowed in the input.
     */
    maxValue?: number;

    /**
     * The maximum length of the input value.
     */
    maxValueLength?: number;

    /**
     * If true, formats the input value as currency.
     */
    isCurrency?: boolean;

    /**
     * Character(s) to use as comma separators if the value is currency. Defaults to a single space.
     */
    currencySpacer?: string;

    /**
     * Optionally, a custom function to format the displayed value.
     */
    formatFn?: (value: string) => string;
}

/**
 * Handles changes to the input value. Processes the raw input and updates it based on provided constraints.
 * 
 * @param inputValue Value given in the native inputfield
 * @param onChange Callback given to the 
 * @param isValueString Whether the value given is a string (as opposed to being undefined or a number)
 * @param maxValue The maximum allowed number value. If input value exeeds maxValue, value will be set to maxValue.
 */
function handleOnChange(
    inputValue: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: any,
    isValueString: boolean,
    maxValue: number | undefined
): void {
    if (!isValueString && inputValue === '') {
        onChange(undefined);
    } else {
        let text = inputValue.replace(/[^0-9]+/g, '');
        if (!isValueString && text === '') {
            onChange(undefined);
        } else {
            if (maxValue !== undefined && +text > maxValue) {
                text = maxValue.toString();
            }
            onChange(isValueString ? text : +text);
        }
    }
}
/**
 * Formats the displayed value of the inputfield
 * 
 * @param inputValue Given input value
 * @param isCurrency Whether the value is supposed to be currency. If true, formats displayed value as currency
 * @param currencySpacer Character(s) to use as comma separators if the value is currency. If not given, a single space is used.
 * @param formatFn Optionally given callback to allow for custom formatting of the displayed value
 * @returns A formatted string value, only used as a display value. 
 */
function formatValue(
    inputValue: number | string | undefined,
    isCurrency: boolean,
    currencySpacer: string | undefined,
    formatFn?: (value: string) => string
): string | undefined {
    if (inputValue === undefined) {
        return '';
    }
    let formattedText = inputValue.toString();
    if (formatFn && inputValue) {
        formattedText = formatFn(formattedText);
    }
    if (isCurrency && !formatFn) {
        formattedText = formattedText.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            currencySpacer !== undefined ? currencySpacer : ' '
        );

        if (formattedText.length > 1 && formattedText[0] === '0') {
            formattedText = formattedText.substring(1);
        }
    }
    return formattedText;
}

/**
 * NumberInput is a specialized input component for numerical values.
 * It extends the functionality of a standard input by allowing additional
 * numeric-specific properties like max value, currency formatting, and custom value formatting.
 * 
 * @param props - Properties of the NumberInput component.
 * @returns A React element representing a numerical input field.
 */
export function NumberInput(props: NumberInputProps): ReactElement {
    const {
        value,
        maxValueLength,
        maxValue,
        onChange,
        invalidText,
        isDisabled,
        placeholder,
        isCurrency,
        currencySpacer,
        autoFocus,
        formatFn,
        isInvalid,
        inputStyles,
    } = props;

    const isValueString = typeof value === 'string';

    return (
        <BaseInput
            {...props}
        >
            <Input
                isInvalid={!!invalidText || isInvalid}
                placeholder={placeholder}
                isDisabled={isDisabled}
                onChange={(e) => {
                    handleOnChange(
                        e.target.value,
                        onChange,
                        isValueString,
                        maxValue
                    );
                }}
                value={formatValue(
                    value,
                    !!isCurrency,
                    currencySpacer,
                    formatFn
                )}
                maxLength={maxValueLength}
                autoFocus={autoFocus}
                sx={inputStyles}
            />
        </BaseInput>
    );
}
