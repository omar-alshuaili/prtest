export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateStudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
}

export interface UpdateStudentFormData {
  firstName: string;
  lastName: string;
  email: string;
}
