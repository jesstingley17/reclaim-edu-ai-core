
// contracts/curriculum.schema.ts
import { z } from 'zod';

/**
 * Defines the source type of the curriculum.
 */
export const CurriculumSourceTypeSchema = z.enum(['PDF', 'TEXT']);
export type CurriculumSourceType = z.infer<typeof CurriculumSourceTypeSchema>;

/**
 * Schema for curriculum provided as a raw text string.
 */
const TextCurriculumInputSchema = z.object({
  sourceType: z.literal(CurriculumSourceTypeSchema.enum.TEXT),
  content: z.string().min(1, { message: 'Text content cannot be empty.' }),
});

/**
 * Schema for curriculum provided as a PDF file.
 * The content is expected to be a base64 encoded string.
 */
const PdfCurriculumInputSchema = z.object({
  sourceType: z.literal(CurriculumSourceTypeSchema.enum.PDF),
  fileName: z.string().min(1, { message: 'File name cannot be empty.' }),
  content: z.string().min(1, { message: 'PDF content cannot be empty.' }), // Assumes base64 encoded content
});

/**
 * A discriminated union to handle different types of curriculum input.
 * This allows for either direct text pasting or PDF file uploads.
 */
export const CurriculumInputSchema = z.discriminatedUnion('sourceType', [
  TextCurriculumInputSchema,
  PdfCurriculumInputSchema,
]);
export type CurriculumInput = z.infer<typeof CurriculumInputSchema>;

/**
 * Schema for the metadata inferred from the curriculum input by the AI.
 * This provides a quick overview of the curriculum's nature.
 */
export const CurriculumMetadataSchema = z.object({
  sourceType: CurriculumSourceTypeSchema,
  inferredGradeRange: z.string().describe('e.g., "K-2", "9-12"'),
  inferredSubject: z.string().describe('e.g., "Mathematics", "World History"'),
  // We can add more inferred data here, like estimated reading time, keyword topics, etc.
  wordCount: z.number().int().positive().optional(),
});
export type CurriculumMetadata = z.infer<typeof CurriculumMetadataSchema>;
