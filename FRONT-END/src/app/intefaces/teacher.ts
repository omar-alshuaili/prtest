export interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateTeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department: string;
}

export interface UpdateTeacherFormData {
  firstName: string;
  lastName: string;
  email: string;
}
