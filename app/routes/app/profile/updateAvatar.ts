import { redirect } from "remix";
import type { ActionFunction } from "remix"
import { updateUserAvatar } from "~/lib/models/user";
import { APP_ROUTE, CHECK_IN_ROUTE } from "~/lib/utils/consts";
import { getUserFromCookie } from "~/lib/utils/session";

export const action: ActionFunction = async ({ request }) => {
  const user = await getUserFromCookie(request);
  if (user === null) return redirect(CHECK_IN_ROUTE);

  const form = await request.formData();
  let avatar = form.get("avatar") as string | null;

  await updateUserAvatar({ user, avatar });

  return redirect(APP_ROUTE);
}

export default function () { }