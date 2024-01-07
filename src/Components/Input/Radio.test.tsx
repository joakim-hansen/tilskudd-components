import { useState, ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

const RADIO_TESTER_LABEL = 'Radio label';
const RADIO_TESTER_INVALID_TEXT = 'Invalid text';
const RADIO_TESTER_CAPTION_TEXT = 'Caption text';
const RADIO_TESTER_OPTIONS = ['First Radio Option', 'Last Radio Option'];

function RadioTester(): ReactElement {
    const [value, setValue] = useState<number>(-1);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [invalidText, setInvalidText] = useState<string>('');

    return (
        <>
            <Radio
                label={RADIO_TESTER_LABEL}
                options={RADIO_TESTER_OPTIONS}
                value={value}
                onChange={setValue}
                invalidText={invalidText}
                captionText={RADIO_TESTER_CAPTION_TEXT}
                isDisabled={isDisabled}
            />
            <button type='button' onClick={() => setIsDisabled(!isDisabled)}>
                Toggle disabled
            </button>
            <button
                type='button'
                onClick={() => setInvalidText(RADIO_TESTER_INVALID_TEXT)}
            >
                Invalidate
            </button>
        </>
    );
}
describe('Radio component test', () => {
    test('should render title, caption, and all radio buttons should be unchecked initially', () => {
        render(<RadioTester />);
        expect(screen.getByText(RADIO_TESTER_LABEL)).toBeVisible();
        expect(screen.getByText(RADIO_TESTER_CAPTION_TEXT)).toBeVisible();
        const firstRadioOption = screen.getByRole('radio', {
            name: 'First Radio Option',
        });
        const lastRadioOption = screen.getByRole('radio', {
            name: 'Last Radio Option',
        });
        expect(firstRadioOption).toBeVisible();
        expect(lastRadioOption).toBeVisible();
        expect(firstRadioOption).not.toBeChecked();
        expect(lastRadioOption).not.toBeChecked();
    });
    test('clicking option should check this option and clicking it again should NOT uncheck it', async () => {
        render(<RadioTester />);
        const firstRadioOption = screen.getByRole('radio', {
            name: 'First Radio Option',
        });
        const lastRadioOption = screen.getByRole('radio', {
            name: 'Last Radio Option',
        });
        userEvent.click(firstRadioOption);
        await waitFor(() => {
            expect(firstRadioOption).toBeChecked();
            expect(lastRadioOption).not.toBeChecked();
        });
        userEvent.click(firstRadioOption);
        await waitFor(() => expect(firstRadioOption).toBeChecked());
    });
    test('clicking option should uncheck other previously checked option', async () => {
        render(<RadioTester />);
        const firstRadioOption = screen.getByRole('radio', {
            name: 'First Radio Option',
        });
        const lastRadioOption = screen.getByRole('radio', {
            name: 'Last Radio Option',
        });
        userEvent.click(lastRadioOption);
        await waitFor(() => expect(lastRadioOption).toBeChecked());
        userEvent.click(firstRadioOption);
        await waitFor(() => {
            expect(lastRadioOption).not.toBeChecked();
            expect(firstRadioOption).toBeChecked();
        });
    });
    test('should not change value on clicking while disabled', async () => {
        render(<RadioTester />);
        const firstRadioOption = screen.getByRole('radio', {
            name: 'First Radio Option',
        });
        const lastRadioOption = screen.getByRole('radio', {
            name: 'Last Radio Option',
        });
        const toggleDisableButton = screen.getByRole('button', {
            name: 'Toggle disabled',
        });
        userEvent.click(toggleDisableButton);
        await waitFor(() => {
            expect(firstRadioOption).toBeDisabled();
            expect(lastRadioOption).toBeDisabled();
        });
        userEvent.click(firstRadioOption);
        await waitFor(() => {
            expect(firstRadioOption).not.toBeChecked();
        });
    });
    test('should show invalid text on invalidate', async () => {
        render(<RadioTester />);
        const invalidateButton = screen.getByRole('button', {
            name: 'Invalidate',
        });
        userEvent.click(invalidateButton);
        expect(
            await screen.findByText(RADIO_TESTER_INVALID_TEXT)
        ).toBeVisible();
    });
});
