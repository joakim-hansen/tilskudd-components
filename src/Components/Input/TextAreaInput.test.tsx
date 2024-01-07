import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextAreaInput } from './TextAreaInput';

const TEXT_AREA_TESTER_LABEL = 'Text area label';
const TEXT_AREA_TESTER_PLACEHOLDER = 'Text area placeholder';
const TEXT_AREA_TESTER_INPUT_VALUE = 'Input text for text area input';
const TEXT_AREA_TESTER_INVALID_TEXT = 'Invalid text';
const TEXT_AREA_TESTER_CAPTION_TEXT = 'Caption text area';

function TextAreaInputTester(): JSX.Element {
    const [value, setValue] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [invalidText, setInvalidText] = useState<string>('');
    return (
        <>
            <TextAreaInput
                label={TEXT_AREA_TESTER_LABEL}
                placeholder={TEXT_AREA_TESTER_PLACEHOLDER}
                onChange={setValue}
                value={value}
                invalidText={invalidText}
                captionText={TEXT_AREA_TESTER_CAPTION_TEXT}
                isDisabled={isDisabled}
            />
            <button type='button' onClick={() => setIsDisabled(!isDisabled)}>
                Toggle disabled
            </button>
            <button
                type='button'
                onClick={() => setInvalidText(TEXT_AREA_TESTER_INVALID_TEXT)}
            >
                Invalidate
            </button>
        </>
    );
}
describe('TextAreaInput component test', () => {
    test('should render TextAreaInput with title, placeholder and caption', () => {
        render(<TextAreaInputTester />);
        expect(screen.getByText(TEXT_AREA_TESTER_LABEL)).toBeVisible();
        expect(screen.getByRole('textbox')).toHaveAttribute(
            'placeholder',
            TEXT_AREA_TESTER_PLACEHOLDER
        );
        expect(screen.getByText(TEXT_AREA_TESTER_CAPTION_TEXT)).toBeVisible();
    });
    test('should change value on typing', async () => {
        render(<TextAreaInputTester />);
        const textAreaInput = screen.getByRole('textbox');
        userEvent.type(textAreaInput, TEXT_AREA_TESTER_INPUT_VALUE);
        await waitFor(() =>
            expect(textAreaInput).toHaveValue(TEXT_AREA_TESTER_INPUT_VALUE)
        );
    });
    test('should not change value on typing while disabled', async () => {
        render(<TextAreaInputTester />);
        const textAreaInput = screen.getByRole('textbox');
        const toggleDisableButton = screen.getByRole('button', {
            name: 'Toggle disabled',
        });
        userEvent.click(toggleDisableButton);
        await waitFor(() => expect(textAreaInput).toBeDisabled());
        userEvent.type(textAreaInput, TEXT_AREA_TESTER_INPUT_VALUE);
        await waitFor(() =>
            expect(textAreaInput).not.toHaveValue(TEXT_AREA_TESTER_INPUT_VALUE)
        );
    });
    test('should show invalid text on invalidate', async () => {
        render(<TextAreaInputTester />);
        const invalidateButton = screen.getByRole('button', {
            name: 'Invalidate',
        });
        userEvent.click(invalidateButton);
        await waitFor(() =>
            expect(
                screen.getByText(TEXT_AREA_TESTER_INVALID_TEXT)
            ).toBeVisible()
        );
    });
});
