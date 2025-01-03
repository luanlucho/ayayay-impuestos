// Cron jobs types and interfaces

export interface CronMessage {
  id: string;
  status: "pending" | "completed" | "failed";
  processing_at?: string;
  resolved_at?: string;
  retries?: number;
  error?: string;
}
