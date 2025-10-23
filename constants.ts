import { type Student, type LearningPath, UserRole } from "./types"

export const DUMMY_STUDENTS: Student[] = [
  {
    id: "S1",
    name: "Thumma Abhishek Reddy",
    email: "23311A05R5@cse.sreenidhi.edu.in",
    rollNumber: "23311A05R5",
    role: UserRole.Student,
  },
  {
    id: "S2",
    name: "Srinivas",
    email: "23311A05R3@cse.sreenidhi.edu.in",
    rollNumber: "23311A05R3",
    role: UserRole.Student,
  },
  {
    id: "S3",
    name: "HariCharan",
    email: "23311A05M5@cse.sreenidhi.edu.in",
    rollNumber: "23311A05M5",
    role: UserRole.Student,
  },
  {
    id: "S4",
    name: "Ratnakar",
    email: "23311A05AG@cse.sreenidhi.edu.in",
    rollNumber: "23311A05AG",
    role: UserRole.Student,
  },
  {
    id: "S5",
    name: "Himanshu",
    email: "23311A05P5@cse.sreenidhi.edu.in",
    rollNumber: "23311A05P5",
    role: UserRole.Student,
  },
  {
    id: "S6",
    name: "Harshitha",
    email: "23311A05P4@cse.sreenidhi.edu.in",
    rollNumber: "23311A05P4",
    role: UserRole.Student,
  },
]

export const ADMIN_CREDENTIALS = {
  email: "vasudeva.rao@sreenidhi.edu.in",
  password: "test123",
}

export const STUDENT_PASSWORD = "test"

export const DUMMY_LEARNING_PATHS: LearningPath[] = [
  {
    id: "LP1",
    jobTitle: "Frontend Developer",
    company: "TCS",
    topics: {
      "Data Structures & Algorithms": [
        { name: "Arrays", completed: true },
        { name: "Linked List", completed: true },
        { name: "Searching Algorithms", completed: false },
      ],
      Aptitude: [
        { name: "Time & Work", completed: false },
        { name: "Probability", completed: false },
      ],
      Development: [
        { name: "HTML", completed: true },
        { name: "CSS & Tailwind", completed: true },
        { name: "React Basics", completed: false },
        { name: "State Management", completed: false },
      ],
    },
  },
]
