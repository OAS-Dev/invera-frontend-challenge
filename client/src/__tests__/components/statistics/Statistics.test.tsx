import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Statistics } from '@/components/statistics/Statistics';
import * as userTypesServices from '@/services/userTypes.services';

// Mock de los servicios
jest.mock('@/services/userTypes.services');

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

describe('Statistics Component', () => {
  const mockUserTypes = {
    totalUsers: 100,
    distribution: [
      { type: 'Organic', count: 30, percentage: 30 },
      { type: 'Social', count: 50, percentage: 50 },
      { type: 'Direct', count: 20, percentage: 20 }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (userTypesServices.getUserTypes as jest.Mock).mockResolvedValue(mockUserTypes);
  });

  test('debe mostrar las estadísticas con la distribución correcta', async () => {
    render(<Statistics />);
    
    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText('Statistics')).toBeInTheDocument();
    });
    
    // Verificar que se muestran los tipos de usuario con sus porcentajes
    expect(screen.getByText('Organic')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Direct')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });
});
