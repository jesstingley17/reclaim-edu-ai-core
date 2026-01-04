
// contracts/pipeline.schema.ts
import { z } from 'zod';

/**
 * Represents the distinct stages of the content generation pipeline.
 */
export enum PipelineStage {
  PREVIEWING = 'PREVIEWING',   // Parsing and analyzing the input curriculum
  CONDENSING = 'CONDENSING',   // Summarizing and structuring the core concepts
  GENERATING = 'GENERATING',   // Creating the instructional materials
  REVIEWING = 'REVIEWING',     // AI-driven quality assurance and finalization
}
export const PipelineStageSchema = z.nativeEnum(PipelineStage);

/**
 * Represents the status of a specific pipeline stage.
 */
export enum PipelineStageStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING', // Completed but with non-fatal issues (e.g., partial generation)
  FAILED = 'FAILED',
}
export const PipelineStageStatusSchema = z.nativeEnum(PipelineStageStatus);

/**
 * Schema for a status update emitted by the pipeline.
 * This object is used to communicate progress to the frontend.
 */
export const PipelineUpdateSchema = z.object({
  stage: PipelineStageSchema,
  status: PipelineStageStatusSchema,
  message: z.string().describe('A user-friendly message about the current status.'),
  progressPercent: z.number().int().min(0).max(100).describe('The overall progress percentage (0-100).'),
  timestamp: z.string().datetime({ message: 'Invalid datetime string format.' }),
});
export type PipelineUpdate = z.infer<typeof PipelineUpdateSchema>;
