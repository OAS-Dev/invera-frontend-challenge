export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  company: string;
  status: string;
}

export interface UserTypes {
  totalUsers: number;
  distribution: Distribution[];
}

export interface Distribution {
  type: string;
  percentage: number;
}
