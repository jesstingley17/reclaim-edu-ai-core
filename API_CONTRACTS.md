
# Reclaim-Edu API Contracts

All endpoints follow a standard JSON response structure:
- **Success:** `{ "success": true, "data": <T> }`
- **Error:** `{ "success": false, "error": StandardError }`

All AI-related endpoints are asynchronous. They initiate a job and return an initial status. The client is expected to poll a separate status endpoint (e.g., `GET /api/ai/status/{jobId}`) to receive `PipelineUpdate` events and the final result. The `jobId` would be returned in the initial response.

| Endpoint              | Method | Request Body                                    | Success Response `data` (`<T>`)                                                                | Description                                                                                              |
| --------------------- | ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **/api/ai/preview**   | `POST` | `CurriculumInput`                               | `{ jobId: string, metadata: CurriculumMetadata, initialUpdate: PipelineUpdate }`               | Submits curriculum, initiates text extraction/analysis, and returns metadata and the job identifier.     |
| **/api/ai/condense**  | `POST` | `{ jobId: string }`                             | `PipelineUpdate`                                                                               | Starts the condensing stage for an existing job. Returns the initial `RUNNING` status for this stage.    |
| **/api/ai/generate**  | `POST` | `{ jobId: string, config: GenerationConfig }`   | `PipelineUpdate`                                                                               | Starts the generation stage using the provided configuration. Returns the initial `RUNNING` status.      |
| **/api/ai/review**    | `POST` | `{ suiteId: string }`                           | `{ jobId: string, initialUpdate: PipelineUpdate }`                                             | Initiates an AI-driven review of a generated suite for quality and alignment.                            |
| **/api/export/pdf**   | `POST` | `ExportRequest`                                 | `{ exportUrl: string }`                                                                        | Requests an export of a suite. Returns a signed URL for downloading the generated PDF file.              |

