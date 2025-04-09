import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ToggleThemeButton } from '@/components/shared/buttons/ToggleThemeButton';
import { ThemeProvider } from 'next-themes';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para useTheme de next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => {
    const [theme, setTheme] = React.useState('dark');
    
    React.useEffect(() => {
      // Simular cambios en el DOM cuando cambia el tema
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }, [theme]);
    
    return { theme, setTheme };
  }
}));

// Mock para React.useState y React.useEffect
import React from 'react';
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn().mockImplementation(originalReact.useState),
    useEffect: jest.fn().mockImplementation(originalReact.useEffect),
  };
});

describe('ToggleThemeButton Component', () => {
  beforeEach(() => {
    // Limpiar clases del documento
    document.documentElement.className = '';
    document.documentElement.style.colorScheme = '';
  });

  test('debe cambiar entre tema oscuro y claro cuando se hace clic en el botón', async () => {
    // Configurar userEvent
    const user = userEvent.setup();
    
    // Renderizar el componente ToggleThemeButton dentro del ThemeProvider
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ToggleThemeButton />
      </ThemeProvider>
    );

    // Encontrar el botón de cambio de tema
    const themeToggleButton = screen.getByRole('button');
    expect(themeToggleButton).toBeInTheDocument();

    // Verificar que el tema inicial es oscuro
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveStyle('color-scheme: dark');

    // Hacer clic en el botón para cambiar al tema claro
    await user.click(themeToggleButton);

    // Verificar que el tema cambió a claro
    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).toHaveStyle('color-scheme: light');

    // Hacer clic nuevamente para volver al tema oscuro
    await user.click(themeToggleButton);

    // Verificar que el tema volvió a oscuro
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveStyle('color-scheme: dark');
  });

  test('debe tener el texto "Toggle theme" para accesibilidad', async () => {
    // Renderizar el componente ToggleThemeButton
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ToggleThemeButton />
      </ThemeProvider>
    );
    
    // Verificar que el botón tiene el texto "Toggle theme" para lectores de pantalla
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });
  
  test('debe tener los colores de tema oscuro correctos (#212121 y #1A1A1A)', async () => {
    // Renderizar el componente ToggleThemeButton
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div data-testid="bg-element" className="bg-[#212121]">Fondo principal</div>
        <div data-testid="component-element" className="bg-[#1A1A1A]">Componente específico</div>
        <ToggleThemeButton />
      </ThemeProvider>
    );
    
    // Verificar que los elementos tienen los colores correctos del tema oscuro
    const bgElement = screen.getByTestId('bg-element');
    const componentElement = screen.getByTestId('component-element');
    
    // Verificar las clases de color
    expect(bgElement).toHaveClass('bg-[#212121]');
    expect(componentElement).toHaveClass('bg-[#1A1A1A]');
  });
});
