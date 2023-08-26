export interface Department {
  _id: string;
  name: string;
}

export interface Subject {
  _id: string;
  title: string;
}

export interface Class {
  _id: string;
  title: string;
  students: any[]; // Update this with the appropriate type
}

export interface Teacher {
  _id: string;
  firstName: string;
}

export interface FormData {
  title: string;
  totalPercentage: string;
  passingPercentage: string;
  teacher: string;
  class: string;
  department: string;
  subject: string;
  students: any[]; // Update this with the appropriate type
  day: string;
  month: string;
  year: string;
}