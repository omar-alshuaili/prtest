export interface Subject {
  _id: string;
  title: string;
  code: string;
  department: string;
}

export interface CreateSubjectFormData {
  title: string;
  code: string;
  department: string;
}

export interface UpdateSubjectFormData {
  title: string;
  code: string;
}
