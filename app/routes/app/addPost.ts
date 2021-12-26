import { json, redirect } from "remix";
import type { ActionFunction } from "remix"
import { addPost } from "~/lib/models/post";
import { APP_ROUTE, CHECK_IN_ROUTE } from "~/lib/utils/consts";
import { getUserFromCookie } from "~/lib/utils/session";

// TODO: I don't like to have this here :/ I want to have it at `/app/index.tsx` but it wont work.
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const content = form.get("content");
  if (typeof content !== "string") return json("Invalid content");

  const user = await getUserFromCookie(request);
  if (user === null) return redirect(CHECK_IN_ROUTE);

  await addPost(user, content)

  return redirect(APP_ROUTE);
}

export default function () { }