import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UsersData } from '@/components/users-data/UsersData';
import * as userServices from '@/services/user.services';

// Mock de los servicios
jest.mock('@/services/user.services');

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

describe('UsersData Component', () => {
  // Datos de prueba completos con todos los campos necesarios
  const mockUsers = [
    {
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'Admin', 
      phone: '123-456-7890',
      location: 'New York',
      company: 'Acme Inc',
      status: 'Online'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (userServices.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  test('debe mostrar la tabla de usuarios con datos', async () => {
    render(<UsersData />);

    // Esperar a que se carguen los datos
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Verificar que se muestran los datos del usuario
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });
});
