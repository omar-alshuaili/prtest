export interface Exam {
  _id: string;
  title: string;
  teacher: Teacher;
  class: Class;
  subject: Subject;
  department: Department;
  students: Student[];
  year: string;
  month: string;
  day: string;
  passingPercentage: number;
  totalPercentage: number;
}

export interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Class {
  _id: string;
  title: string;
  year: number;
}

export interface Subject {
  _id: string;
  title: string;
}

export interface Department {
  _id: string;
  name: string;
}

export interface Student {
  student: {
    _id: string;
    lastName: string;
    firstName: string;
  };
}
