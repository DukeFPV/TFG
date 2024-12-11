CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"age" integer NOT NULL,
	"health" text NOT NULL,
	"bank" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
