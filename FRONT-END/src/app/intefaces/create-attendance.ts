export interface Class {
  _id: string;
  title: string;
}

export interface Subject {
  _id: string;
}

export interface TeacherInfo {
  department: { _id: string };
}

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isChecked: boolean;
}

export interface FormData {
  lesson: string;
  topic: string;
  department: string;
  class: Class;
  teacher: string;
  subject: Subject;
  day: string;
  month: string;
  year: string;
  students: { student: string; isPresent: boolean }[];
}
