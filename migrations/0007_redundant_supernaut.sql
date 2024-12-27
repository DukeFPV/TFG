CREATE TABLE IF NOT EXISTS "user_health_center_selections" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" varchar(256) NOT NULL,
	"health_center_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "clerk_user_id" varchar(256);--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "selected_health_center_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_health_center_selections" ADD CONSTRAINT "user_health_center_selections_health_center_id_health_centers_id_fk" FOREIGN KEY ("health_center_id") REFERENCES "public"."health_centers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_selected_health_center_id_health_centers_id_fk" FOREIGN KEY ("selected_health_center_id") REFERENCES "public"."health_centers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_clerk_user_id_unique" UNIQUE("clerk_user_id");