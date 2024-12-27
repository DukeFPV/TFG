CREATE TABLE IF NOT EXISTS "health_centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"region" text,
	"province" text,
	"municipality" text,
	"locality" text,
	"address" text,
	"postal_code" text,
	"phone" text,
	"health_zone" text,
	"health_area" text,
	"management_type" text,
	"management_dependency" text,
	"center_type" text,
	"teaching_accreditation" boolean
);
