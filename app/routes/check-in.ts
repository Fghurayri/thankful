import { json } from "remix";
import type { ActionFunction } from "remix"
import { checkIn } from "~/lib/utils/session";


export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const mnemonic = form.get("mnemonic");

  if (typeof mnemonic !== "string") return json("invalid mnemonic");

  return await checkIn(mnemonic)
}

export default function () { }