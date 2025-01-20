ALTER TABLE "user_profiles" ALTER COLUMN "clerk_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "birthday" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "current_step" integer DEFAULT 1;