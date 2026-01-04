
// contracts/export.schema.ts
import { z } from 'zod';

/**
 * Defines the available formats for exporting the Instructional Suite.
 */
export enum ExportFormat {
  PDF = 'PDF',
  DOCX = 'DOCX',
  GOOGLE_DOCS = 'GOOGLE_DOCS',
  MARKDOWN = 'MARKDOWN',
}
export const ExportFormatSchema = z.nativeEnum(ExportFormat);

/**
 * Schema for a request to export an Instructional Suite.
 */
export const ExportRequestSchema = z.object({
  suiteId: z.string().uuid({ message: 'A valid suiteId is required for export.' }),
  format: ExportFormatSchema,
  includeTeacherKey: z.boolean().default(false).describe('Whether to include the teacher answer key in the export.'),
});
export type ExportRequest = z.infer<typeof ExportRequestSchema>;
