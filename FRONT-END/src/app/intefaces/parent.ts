export interface Parent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateParentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateParentFormData {
  firstName: string;
  lastName: string;
  email: string;
}
