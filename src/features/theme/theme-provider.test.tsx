import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '@/features/theme/theme-provider';
import { useTheme } from '@/features/theme/use-theme';

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

describe('ThemeProvider', () => {
  it('applies and toggles the theme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'light' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    await user.click(screen.getByRole('button', { name: 'light' }));

    expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
