import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

const TEXT_TESTER_LABEL = 'Text label';
const TEXT_TESTER_PLACEHOLDER = 'Text placeholder';
const TEXT_TESTER_INPUT_VALUE = 'Input text for text input';
const TEXT_TESTER_INVALID_TEXT = 'Invalid text';
const TEXT_TESTER_CAPTION_TEXT = 'Caption text';

function TextInputTester(): JSX.Element {
    const [value, setValue] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [invalidText, setInvalidText] = useState<string>('');
    return (
        <>
            <TextInput
                label={TEXT_TESTER_LABEL}
                placeholder={TEXT_TESTER_PLACEHOLDER}
                onChange={setValue}
                value={value}
                invalidText={invalidText}
                captionText={TEXT_TESTER_CAPTION_TEXT}
                isDisabled={isDisabled}
            />
            <button type='button' onClick={() => setIsDisabled(!isDisabled)}>
                Toggle disabled
            </button>
            <button
                type='button'
                onClick={() => setInvalidText(TEXT_TESTER_INVALID_TEXT)}
            >
                Invalidate
            </button>
        </>
    );
}
describe('TextInput component test', () => {
    test('should render TextInput with title, placeholder and caption', () => {
        render(<TextInputTester />);
        expect(screen.getByText(TEXT_TESTER_LABEL)).toBeVisible();
        expect(screen.getByRole('textbox')).toHaveAttribute(
            'placeholder',
            TEXT_TESTER_PLACEHOLDER
        );
        expect(screen.getByText(TEXT_TESTER_CAPTION_TEXT)).toBeVisible();
    });
    test('should change value on typing', async () => {
        render(<TextInputTester />);
        const textInput = screen.getByRole('textbox');
        userEvent.type(textInput, TEXT_TESTER_INPUT_VALUE);
        await waitFor(() =>
            expect(textInput).toHaveValue(TEXT_TESTER_INPUT_VALUE)
        );
    });
    test('should not change value on typing while disabled', async () => {
        render(<TextInputTester />);
        const textInput = screen.getByRole('textbox');
        const toggleDisableButton = screen.getByRole('button', {
            name: 'Toggle disabled',
        });
        userEvent.click(toggleDisableButton);
        await waitFor(() => expect(textInput).toBeDisabled());
        userEvent.type(textInput, TEXT_TESTER_INPUT_VALUE);
        await waitFor(() =>
            expect(textInput).not.toHaveValue(TEXT_TESTER_INPUT_VALUE)
        );
    });
    test('should show invalid text on invalidate', async () => {
        render(<TextInputTester />);
        const invalidateButton = screen.getByRole('button', {
            name: 'Invalidate',
        });
        userEvent.click(invalidateButton);
        await waitFor(() =>
            expect(screen.getByText(TEXT_TESTER_INVALID_TEXT)).toBeVisible()
        );
    });
});
