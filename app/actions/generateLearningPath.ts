"use server"

import { GoogleGenAI, Type } from "@google/genai"
import type { LearningCategory } from "@/types"

const API_KEY = process.env.GEMINI_API_KEY

const generateDummyPath = (): LearningCategory => {
  return {
    "Data Structures & Algorithms": [
      { name: "Big O Notation", completed: false },
      { name: "Hash Tables", completed: false },
      { name: "Graph Traversal", completed: false },
    ],
    "Backend Development": [
      { name: "REST API Principles", completed: false },
      { name: "Database Design", completed: false },
      { name: "Authentication & Authorization", completed: false },
    ],
    "Cloud & DevOps": [
      { name: "CI/CD Pipelines", completed: false },
      { name: "Containerization with Docker", completed: false },
      { name: "Serverless Functions", completed: false },
    ],
  }
}

export async function generateLearningPathFromJD(jobDescription: string): Promise<LearningCategory> {
  if (!API_KEY) {
    console.warn("Gemini API key not found. Using dummy data. Please set the GEMINI_API_KEY environment variable.")
    return generateDummyPath()
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY })
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following job description and generate a structured learning path for a student preparing for this role. Group the topics into relevant categories like "Data Structures & Algorithms", "Backend Development", "Frontend Development", "Cloud & DevOps", "Aptitude", "Core CS Concepts", etc. The output must be a JSON object where keys are the categories and values are arrays of topic strings.
Job Description:
---
${jobDescription}
---
`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            "Data Structures & Algorithms": { type: Type.ARRAY, items: { type: Type.STRING } },
            "Backend Development": { type: Type.ARRAY, items: { type: Type.STRING } },
            "Frontend Development": { type: Type.ARRAY, items: { type: Type.STRING } },
            "Cloud & DevOps": { type: Type.ARRAY, items: { type: Type.STRING } },
            Aptitude: { type: Type.ARRAY, items: { type: Type.STRING } },
            "Core CS Concepts": { type: Type.ARRAY, items: { type: Type.STRING } },
            "Tools & Technologies": { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    })

    const jsonText = response.text.trim()
    const parsedJson = JSON.parse(jsonText)

    const filteredCategories: LearningCategory = {}
    for (const category in parsedJson) {
      if (Array.isArray(parsedJson[category]) && parsedJson[category].length > 0) {
        filteredCategories[category] = parsedJson[category].map((name: string) => ({ name, completed: false }))
      }
    }
    return filteredCategories
  } catch (error) {
    console.error("Error generating learning path from Gemini API:", error)
    return generateDummyPath()
  }
}
