CREATE TYPE "public"."task_priority" AS ENUM('low', 'medium', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'done', 'cancelled');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "deadline" timestamp;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "task_priority";--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" "task_status" DEFAULT 'todo' NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "is_completed";