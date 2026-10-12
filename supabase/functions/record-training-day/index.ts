import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const shortcutSecret = Deno.env.get("TRAINING_SHORTCUT_SECRET");

export default {
  async fetch(req: Request): Promise<Response> {
    // Only accept POST requests.
    if (req.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405 },
      );
    }

    // Verify the shortcut's dedicated secret.
    const authorization = req.headers.get("Authorization");

    if (
      !shortcutSecret ||
      authorization !== `Bearer ${shortcutSecret}`
    ) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Verify server configuration.
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase configuration");

      return Response.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Read and validate the training date.
    let payload: unknown;

    try {
      payload = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON" },
        { status: 400 },
      );
    }

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("trained_on" in payload) ||
      typeof payload.trained_on !== "string"
    ) {
      return Response.json(
        { error: "Missing training date" },
        { status: 400 },
      );
    }

    const trainedOn = payload.trained_on;

    // Require YYYY-MM-DD and a valid calendar date.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trainedOn)) {
      return Response.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    const parsedDate = new Date(`${trainedOn}T00:00:00Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== trainedOn
    ) {
      return Response.json(
        { error: "Invalid calendar date" },
        { status: 400 },
      );
    }

    // Write to Supabase only after authentication.
    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { error } = await supabase
      .from("training_days")
      .upsert(
        { trained_on: trainedOn },
        { onConflict: "trained_on", ignoreDuplicates: true },
      );

    if (error) {
      console.error("Training day insert failed", error.message);

      return Response.json(
        { error: "Database error" },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      trained_on: trainedOn,
    });
  },
};
