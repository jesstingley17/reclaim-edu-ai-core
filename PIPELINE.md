
# Pipeline Behavior Definition

This document defines the operational logic of the Reclaim-Edu AI generation pipeline.

### 1. Order of Execution

The pipeline executes in a strict, sequential order. A stage only begins after the previous stage has completed successfully.

1.  **PREVIEWING**: The process starts here upon initial curriculum submission. It involves parsing the input (text extraction/OCR for PDFs) and inferring initial metadata (`inferredGradeRange`, `inferredSubject`).
2.  **CONDENSING**: The extracted text is processed to identify key concepts, themes, and learning objectives. This creates a structured, condensed representation of the curriculum that serves as the foundation for generation.
3.  **GENERATING**: This is the core stage where the `InstructionalSuite` is created based on the condensed content and the user-provided `GenerationConfig`. It generates sections, items, visuals, and the teacher key.
4.  **REVIEWING**: After generation, an AI-driven review process checks for coherence, accuracy, pedagogical soundness, and alignment with the user's configuration. It may perform minor corrections before finalizing the suite.

### 2. Retry Rules

To ensure resilience, stages have built-in retry logic for transient failures.

-   **PREVIEWING**: Retries **once** on failure. Failures here are often due to malformed files or transient OCR service issues.
-   **CONDENSING**: Retries up to **2 times** with exponential backoff. This is for handling intermittent AI provider issues like rate limiting or temporary unavailability.
-   **GENERATING**: Retries up to **2 times**. If a specific section or visual fails to generate, the system may attempt to regenerate only that component instead of the entire suite.
-   **REVIEWING**: Retries **once**.

### 3. Partial Success Handling

The system is designed to provide value even if parts of the process fail.

-   **GENERATING Stage**: If the pipeline successfully generates some, but not all, of the requested `outputTypes` or sections after all retries are exhausted, the process will complete with a `WARNING` status. The `InstructionalSuite` will contain the successfully generated sections, and the final pipeline update message will inform the user about the components that could not be created.

### 4. Retryable vs. Fatal Failures

Failures are categorized to determine the appropriate next step.

-   **Retryable Failures (`retryable: true`)**:
    -   Network timeouts or connectivity issues.
    -   AI provider API errors (e.g., HTTP 503 Service Unavailable, HTTP 429 Rate Limit Exceeded).
    -   Transient infrastructure hiccups.
    -   *Action*: The system will automatically attempt a retry according to the stage's rules.

-   **Fatal Failures (`retryable: false`)**:
    -   Invalid or corrupted input file (e.g., unreadable PDF).
    -   Content that violates the AI provider's safety and content policies.
    -   A persistent, unrecoverable error from the AI provider (e.g., a critical bug).
    -   Invalid configuration that cannot be resolved (though this should be caught by validation).
    -   *Action*: The pipeline halts immediately, enters the `FAILED` state, and reports the error. No further retries are attempted.

### 5. Progress Percentage Advancement

The `progressPercent` is designed to give the user a meaningful sense of progress and is not strictly linear with time.

-   **0%**: Job initiated.
-   **PREVIEWING (0% -> 10%)**: Jumps to 10% upon successful completion of this stage.
-   **CONDENSING (10% -> 30%)**: Progresses incrementally from 10% to 30% as the source material is analyzed and chunked. Reaches 30% on completion.
-   **GENERATING (30% -> 90%)**: This is the longest stage. Progress advances from 30% to 90% as each section and item in the `InstructionalSuite` is created. For example, if there are 5 sections to generate, progress might advance by 12% for each completed section.
-   **REVIEWING (90% -> 100%)**: Jumps from 90% to 100% upon successful completion of the final review, indicating the `InstructionalSuite` is ready.

