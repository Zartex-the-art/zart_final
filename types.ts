export enum UserRole {
  Admin = "Admin",
  Student = "Student",
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface Student extends User {
  role: UserRole.Student
  assignedLearningPathId?: string
}

export interface Admin extends User {
  role: UserRole.Admin
}

export interface JobDescription {
  id: string
  company: string
  jobTitle: string
  description: string
  createdAt: Date
}

export interface LearningTopic {
  name: string
  completed: boolean
}

export interface LearningCategory {
  [categoryName: string]: LearningTopic[]
}

export interface LearningPath {
  id: string
  jobTitle: string
  company: string
  topics: LearningCategory
}
