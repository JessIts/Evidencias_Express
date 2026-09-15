export interface CreateStudentDTO {
  name: string;
  age: number;
  route: string;
}

export interface UpdateStudentDTO {
  name?: string;
  age?: number;
  route?: string;
}