import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  message: z.string().trim().min(1, "Please write a message.").max(2000, "Message must be 2,000 characters or fewer."),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactFormSchema.parse(input))
  .handler(async ({ data }) => {
    const request = getRequest();
    const remoteAddress = request.headers.get("cf-connecting-ip");

    if (!remoteAddress) {
      throw new Error("We could not send your message right now. Please try again in a moment.");
    }

    const addressBytes = new TextEncoder().encode(remoteAddress);
    const addressDigest = await crypto.subtle.digest("SHA-256", addressBytes);
    const clientKey = Array.from(new Uint8Array(addressDigest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("submit_contact_message", {
      _name: data.name,
      _email: data.email,
      _message: data.message,
      _client_key: clientKey,
    });

    if (error) {
      throw new Error(
        error.message.includes("Please wait")
          ? "Please wait a little before sending another message."
          : "We could not send your message right now. Please try again in a moment.",
      );
    }

    return { success: true };
  });