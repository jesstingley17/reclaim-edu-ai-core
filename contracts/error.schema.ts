
// contracts/error.schema.ts
import { z } from 'zod';

/**
 * Standardized error codes for the application.
 */
export enum ErrorCode {
  // General Errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',

  // Input Validation Errors
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_PDF = 'INVALID_PDF',
  CONTENT_TOO_LONG = 'CONTENT_TOO_LONG',

  // AI Pipeline Errors
  AI_GENERATION_FAILED = 'AI_GENERATION_FAILED',
  CONTENT_POLICY_VIOLATION = 'CONTENT_POLICY_VIOLATION',
  AI_PROVIDER_UNAVAILABLE = 'AI_PROVIDER_UNAVAILABLE',

  // Resource Errors
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // Export Errors
  EXPORT_FAILED = 'EXPORT_FAILED',
}
export const ErrorCodeSchema = z.nativeEnum(ErrorCode);

/**
 * The standard error response schema used throughout the API.
 */
export const StandardErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string().describe('A user-friendly error message.'),
  details: z.string().optional().describe('Additional technical details for logging or debugging.'),
  retryable: z.boolean().describe('Indicates if the client can safely retry the request.'),
});
export type StandardError = z.infer<typeof StandardErrorSchema>;
