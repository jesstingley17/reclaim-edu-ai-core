
// contracts/suite.schema.ts
import { z } from 'zod';

/**
 * Defines the type of a visual element.
 */
export enum VisualType {
  IMAGE = 'IMAGE',
  DIAGRAM = 'DIAGRAM',
  CHART = 'CHART',
}
export const VisualTypeSchema = z.nativeEnum(VisualType);

/**
 * Schema for a single visual element within the suite.
 */
const VisualSchema = z.object({
  type: VisualTypeSchema,
  caption: z.string().describe('A descriptive caption for the visual.'),
  imageRef: z.string().url().describe('A URL or internal reference to the image asset.'),
});

/**
 * Schema for a single item within a section, such as a question or activity.
 */
const SectionItemSchema = z.object({
  itemId: z.string().uuid(),
  prompt: z.string().describe('The instructional prompt or context for the item.'),
  studentContent: z.string().describe('The actual question or content presented to the student.'),
});

/**
 * Schema for a section within the instructional suite, grouping related items.
 */
const SuiteSectionSchema = z.object({
  sectionId: z.string().uuid(),
  name: z.string().describe('The title of the section, e.g., "Key Vocabulary" or "Chapter 5 Quiz".'),
  items: z.array(SectionItemSchema),
});

/**
 * Schema for the teacher-only answer key.
 */
const TeacherKeySchema = z.object({
  answers: z.array(z.string()).describe('A list of correct answers, corresponding to the items.'),
  briefExplanation: z.string().describe('A brief explanation of the concepts or rationale behind the answers.'),
});

/**
 * The main schema for the complete Instructional Suite.
 * This is the final product delivered to the teacher.
 */
export const InstructionalSuiteSchema = z.object({
  suiteId: z.string().uuid(),
  title: z.string().describe('The overall title of the instructional suite.'),
  subject: z.string(),
  gradeLevel: z.string(),
  sections: z.array(SuiteSectionSchema),
  teacherKey: TeacherKeySchema,
  visuals: z.array(VisualSchema).optional().describe('Optional visual aids to supplement the materials.'),
});
export type InstructionalSuite = z.infer<typeof InstructionalSuiteSchema>;
