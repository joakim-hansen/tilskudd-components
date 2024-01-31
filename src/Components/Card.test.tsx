import { ReactElement } from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardLocal } from './CardLocal';

const CARD_TESTER_TITLE = 'CardTitle';
const CARD_TESTER_BODY = 'CardBody';
const ACTION_ICON_TESTID = 'ActionIconTestId';
const TITLE_ICON_TESTID = 'TitleIconTestId';

function CardTester(props: { mockOnClick: () => void }): ReactElement {
    const { mockOnClick } = props;
    return (
        <CardLocal
            title={CARD_TESTER_TITLE}
            body={CARD_TESTER_BODY}
            onClick={mockOnClick}
            actionIcon={<div data-testid={ACTION_ICON_TESTID}>Placeholder</div>}
            titleIcon={<div data-testid={TITLE_ICON_TESTID}>Placeholder</div>}
        />
    );
}

describe('Card component test', () => {
    const mockOnClick = vi.fn();
    test('should render with title, icon and body', () => {
        render(<CardTester mockOnClick={mockOnClick} />);

        expect(screen.getByRole('button')).toBeVisible();
        expect(screen.getByText(CARD_TESTER_TITLE)).toBeVisible();
        expect(screen.getByText(CARD_TESTER_BODY)).toBeVisible();
        expect(screen.getByTestId(ACTION_ICON_TESTID)).toBeVisible();
        expect(screen.getByTestId(TITLE_ICON_TESTID)).toBeVisible();
    });
    test('should call passed function when card is clicked', async () => {
        render(<CardTester mockOnClick={mockOnClick} />);
        const card = screen.getByRole('button');
        expect(card).toBeVisible();
        userEvent.click(card);
        await waitFor(() => expect(mockOnClick).toHaveBeenCalledTimes(1));
    });
});
