import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {DataTable} from '@/components/shared/tables/user-table/data-table';
import {Pagination} from '@/components/shared/tables/user-table/components/Pagination';
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

// Mock del componente Pagination
jest.mock('@/components/shared/tables/user-table/components/Pagination', () => ({
  Pagination: jest.fn(() => <div data-testid='mocked-pagination'>Pagination Component</div>),
}));

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  location: string;
  company: string;
  status: string;
}

const mockData: MockUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    phone: '123-456-7890',
    location: 'New York',
    company: 'Acme Inc',
    status: 'Online',
  },
  {
    id: '2',
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
      id: (i + 3).toString(),
      name: `User ${i + 3}`,
      email: `user${i + 3}@example.com`,
      role: 'User',
      phone: '555-555-5555',
      location: 'Chicago',
      company: 'Test Corp',
      status: i % 2 === 0 ? 'Online' : 'Offline',
    })),
];

const mockColumns: ColumnDef<MockUser>[] = [
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

const mockHandlers = {
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('DataTable Component', () => {
  test('debe mostrar la tabla con paginación como componente separado', () => {
    render(
      <DataTable columns={mockColumns} data={mockData} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />,
    );

    // Verificar que la tabla se renderiza correctamente
    const dataTable = screen.getByTestId('data-table');
    expect(dataTable).toBeInTheDocument();

    // Verificar que se muestra al menos un nombre de usuario
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Verificar que el componente Pagination está incluido
    const paginationComponent = screen.getByTestId('mocked-pagination');
    expect(paginationComponent).toBeInTheDocument();

    // Verificar que el componente Pagination fue llamado
    expect(Pagination).toHaveBeenCalled();
  });
});
