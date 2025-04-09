import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DataTable} from '@/components/shared/tables/user-table/data-table';
import {ColumnDef} from '@tanstack/react-table';

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
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

interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  location: string;
  company: string;
  status: string;
}

const mockColumns: ColumnDef<MockUser, unknown>[] = [
  {
    accessorKey: 'name',
    header: () => 'Name',
    cell: ({row}) => row.getValue('name'),
  },
  {
    accessorKey: 'email',
    header: () => 'Email',
    cell: ({row}) => row.getValue('email'),
  },
  {
    accessorKey: 'phone',
    header: () => 'Phone',
    cell: ({row}) => row.getValue('phone'),
  },
  {
    accessorKey: 'location',
    header: () => 'Location',
    cell: ({row}) => row.getValue('location'),
  },
  {
    accessorKey: 'company',
    header: () => 'Company',
    cell: ({row}) => row.getValue('company'),
  },
  {
    accessorKey: 'status',
    header: () => 'Status',
    cell: ({row}) => row.getValue('status'),
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: () => null,
  },
];

describe('DataTable Component', () => {
  const mockData: MockUser[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      phone: '123-456-7890',
      location: 'New York',
      company: 'Acme Inc',
      status: 'Online',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      phone: '098-765-4321',
      location: 'Los Angeles',
      company: 'Globex Corp',
      status: 'Offline',
    },
    // Añadir más datos para probar la paginación
    ...Array(10)
      .fill(0)
      .map((_, i) => ({
        id: i + 3,
        name: `User ${i + 3}`,
        email: `user${i + 3}@example.com`,
        role: 'User',
        phone: '555-555-5555',
        location: 'Chicago',
        company: 'Test Corp',
        status: i % 2 === 0 ? 'Online' : 'Offline',
      })),
  ];

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  test('debe mostrar la tabla con paginación y componentes distribuidos correctamente', () => {
    render(
      <DataTable columns={mockColumns} data={mockData} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />,
    );

    // Verificar que la tabla se renderiza correctamente
    const dataTable = screen.getByTestId('data-table');
    expect(dataTable).toBeInTheDocument();

    // Verificar que se muestra al menos un nombre de usuario
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Verificar que existe el contenedor de paginación con grid de 3 columnas
    const paginationContainer = screen.getByTestId('pagination-container');
    expect(paginationContainer).toBeInTheDocument();
    expect(paginationContainer).toHaveClass('grid');
    expect(paginationContainer).toHaveClass('grid-cols-3');

    // Verificar que el contador de páginas está presente en la primera columna
    const pageCounter = screen.getByTestId('page-counter');
    expect(pageCounter).toBeInTheDocument();
    expect(pageCounter).toHaveTextContent('of');

    // Verificar que el selector de filas por página está presente en la columna central
    const rowsPerPage = screen.getByTestId('rows-per-page');
    expect(rowsPerPage).toBeInTheDocument();
    expect(rowsPerPage).toHaveClass('flex');
    expect(rowsPerPage).toHaveClass('justify-center');

    // Verificar que los botones de navegación están presentes en la columna derecha
    const navigationButtons = screen.getByTestId('navigation-buttons');
    expect(navigationButtons).toBeInTheDocument();
    expect(navigationButtons).toHaveClass('flex');
    expect(navigationButtons).toHaveClass('justify-end');
  });
});
