import { ReactElement } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const ACCORDION_TITLES: string[] = ['First', 'Second'];
const ACCORDION_CONTENT: string[] = ['FirstContent', 'SecondContent'];

function AccordionTester(): ReactElement {
    const accordionItems = [
        {
            title: ACCORDION_TITLES[0],
            content: <div>{ACCORDION_CONTENT[0]}</div>,
        },
        {
            title: ACCORDION_TITLES[1],
            content: <div>{ACCORDION_CONTENT[1]}</div>,
        },
    ];
    return <Accordion items={accordionItems} allowMultiple />;
}

describe('Accordion component test', () => {
    test('should render accordions unexpanded, and show no content', () => {
        render(<AccordionTester />);
        const firstAccordion = screen.getByRole('button', {
            name: ACCORDION_TITLES[0],
        });
        const secondAccordion = screen.getByRole('button', {
            name: ACCORDION_TITLES[1],
        });
        expect(firstAccordion).toBeVisible();
        expect(secondAccordion).toBeVisible();
        expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
        expect(secondAccordion).toHaveAttribute('aria-expanded', 'false');
        expect(screen.getByText(ACCORDION_CONTENT[0])).not.toBeVisible();
        expect(screen.getByText(ACCORDION_CONTENT[1])).not.toBeVisible();
    });
    test('should show content when accordion is clicked, and hide it when clicked again', async () => {
        render(<AccordionTester />);
        const firstAccordion = screen.getByRole('button', {
            name: ACCORDION_TITLES[0],
        });
        userEvent.click(firstAccordion);
        await waitFor(() => {
            expect(screen.getByText(ACCORDION_CONTENT[0])).toBeVisible();
        });
        await waitFor(() => {
            expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
        });
        userEvent.click(firstAccordion);
        await waitFor(() => {
            expect(screen.getByText(ACCORDION_CONTENT[0])).not.toBeVisible();
        });
        await waitFor(() => {
            expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
        });
    });
    test('should show all content when all accordions are clicked', async () => {
        render(<AccordionTester />);
        const firstAccordion = screen.getByRole('button', {
            name: ACCORDION_TITLES[0],
        });
        const secondAccordion = screen.getByRole('button', {
            name: ACCORDION_TITLES[1],
        });
        userEvent.click(firstAccordion);
        await waitFor(() => {
            expect(screen.getByText(ACCORDION_CONTENT[0])).toBeVisible();
        });
        userEvent.click(secondAccordion);
        await waitFor(() => {
            expect(screen.getByText(ACCORDION_CONTENT[1])).toBeVisible();
        });
    });
});
