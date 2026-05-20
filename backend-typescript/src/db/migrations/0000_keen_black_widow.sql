CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar,
	"is_completed" boolean DEFAULT false NOT NULL
);
