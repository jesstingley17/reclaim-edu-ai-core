
// contracts/generation.schema.ts
import { z } from 'zod';

/**
 * Specifies the type of instructional material to be generated.
 */
export enum OutputType {
  LESSON_PLAN = 'LESSON_PLAN',
  MULTIPLE_CHOICE_QUIZ = 'MULTIPLE_CHOICE_QUIZ',
  FREE_RESPONSE_QUESTIONS = 'FREE_RESPONSE_QUESTIONS',
  VOCABULARY_LIST = 'VOCABULARY_LIST',
  PROJECT_BASED_ACTIVITY = 'PROJECT_BASED_ACTIVITY',
  EXIT_TICKET = 'EXIT_TICKET',
}
export const OutputTypeSchema = z.nativeEnum(OutputType);

/**
 * Represents the cognitive level of the generated content, based on Bloom's Taxonomy.
 */
export enum BloomLevel {
  REMEMBER = 'REMEMBER',
  UNDERSTAND = 'UNDERSTAND',
  APPLY = 'APPLY',
  ANALYZE = 'ANALYZE',
  EVALUATE = 'EVALUATE',
  CREATE = 'CREATE',
}
export const BloomLevelSchema = z.nativeEnum(BloomLevel);

/**
 * Specifies the differentiation strategy to apply to the content,
 * catering to diverse student needs.
 */
export enum Differentiation {
  SUPPORT = 'SUPPORT',       // For students needing extra help
  ON_LEVEL = 'ON_LEVEL',     // For the majority of students
  CHALLENGE = 'CHALLENGE',     // For students who need an extra challenge
  ELL = 'ELL',               // For English Language Learners
}
export const DifferentiationSchema = z.nativeEnum(Differentiation);

/**
 * Defines the aesthetic style for any generated visual aids.
 */
export enum VisualStyle {
  PHOTOREALISTIC = 'PHOTOREALISTIC',
  CARTOON = 'CARTOON',
  MINIMALIST = 'MINIMALIST',
  INFOGRAPHIC = 'INFOGRAPHIC',
  DIAGRAM = 'DIAGRAM',
}
export const VisualStyleSchema = z.nativeEnum(VisualStyle);

/**
 * The main configuration schema that guides the AI generation process.
 * Teachers can use these options to tailor the output to their specific classroom needs.
 */
export const GenerationConfigSchema = z.object({
  outputTypes: z.array(OutputTypeSchema).min(1, 'At least one output type must be selected.'),
  bloomLevels: z.array(BloomLevelSchema).optional().describe('Target cognitive levels for questions and activities.'),
  differentiationLevels: z.array(DifferentiationSchema).optional().describe('Generate materials for different student groups.'),
  visualStyle: VisualStyleSchema.optional().describe('The desired style for any generated images or diagrams.'),
  targetGradeLevel: z.string().describe('e.g., "5th Grade"'),
  targetSubject: z.string().describe('e.g., "Life Science"'),
  // Add any other configuration options here, e.g., language, tone, specific standards to align with.
});
export type GenerationConfig = z.infer<typeof GenerationConfigSchema>;
