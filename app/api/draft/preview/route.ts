import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  const previewSecret = process.env.SANITY_PREVIEW_SECRET || "preview-secret-123";

  // Check secret
  if (secret !== previewSecret) {
    return new Response("Invalid secret", { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to preview target
  if (type === "post" && slug) {
    redirect(`/blog/${slug}`);
  } else if (type === "project" && slug) {
    redirect(`/projects/${slug}`);
  }

  redirect("/");
}
