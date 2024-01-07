import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const TAB_ONE_TITLE = 'TabOne';
const TAB_TWO_TITLE = 'TabTwo';
const TAB_ONE_CONTENT = 'FirstContent';
const TAB_TWO_CONTENT = 'SecondContent';

function TabsTester(): JSX.Element {
    const tabs = [
        {
            title: TAB_ONE_TITLE,
            children: <div>{TAB_ONE_CONTENT}</div>,
        },
        {
            title: TAB_TWO_TITLE,
            children: <div>{TAB_TWO_CONTENT}</div>,
        },
    ];

    return (
        <div>
            <Tabs tabs={tabs} />
        </div>
    );
}

describe('Tabs component test', () => {
    test('default tab selected, only first content visible', () => {
        render(<TabsTester />);
        expect(
            screen.getByRole('tab', { name: TAB_ONE_TITLE })
        ).toHaveAttribute('aria-selected', 'true');
        expect(
            screen.getByRole('tab', { name: TAB_TWO_TITLE })
        ).toHaveAttribute('aria-selected', 'false');
        expect(screen.getByText(TAB_ONE_CONTENT)).toBeVisible();
        expect(screen.getByText(TAB_TWO_CONTENT)).not.toBeVisible();
    });

    test('click second tab, second tab selected, only second content visible', async () => {
        render(<TabsTester />);
        const tabTwo = screen.getByRole('tab', { name: TAB_TWO_TITLE });
        expect(screen.getByText(TAB_ONE_CONTENT)).toBeVisible();
        userEvent.click(tabTwo);
        await waitFor(() =>
            expect(tabTwo).toHaveAttribute('aria-selected', 'true')
        );
        expect(
            await screen.findByRole('tab', { name: TAB_ONE_TITLE })
        ).toHaveAttribute('aria-selected', 'false');
        expect(await screen.findByText(TAB_ONE_CONTENT)).not.toBeVisible();
        expect(await screen.findByText(TAB_TWO_CONTENT)).toBeVisible();
    });
});
