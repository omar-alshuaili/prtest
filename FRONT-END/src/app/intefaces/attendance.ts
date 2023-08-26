export interface Teacher {
  // Define the properties of the Teacher interface
  // Add more properties if needed
  _id: string;
  name: string;
  firstName: string;
}

export interface Attendance {
  // Define the properties of the Attendance interface
  // Add more properties if needed
  _id: string;
  lessonName: string;
  topicName: string;
  studentName: string;
  isPresent: boolean;
  year: string;
  month: string;
  day: string;
  subject: {
    title: string;
  };
  class: {
    title: string;
  };
  department: {
    name: string;
  };
  attendance: {
    _id: string;
    day: string;
    month: string;
    year: string;
  }
}

export interface StudentDetails {
  // Define the properties of the StudentDetails interface
  // Add more properties if needed
  _id: string;
  firstName: string;
  lastName: string;
  className: string;
  classYear: number;
  departmentName: string;
  studentAttendances: Attendance[];
}

export interface Parent {
  // Define the properties of the Parent interface
  // Add more properties if needed
  _id: string;
  students: StudentDetails[];
}
