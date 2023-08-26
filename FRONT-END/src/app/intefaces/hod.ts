export interface Hod {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateHodFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
}

export interface UpdateHodFormData {
  firstName: string;
  lastName: string;
  email: string;
}