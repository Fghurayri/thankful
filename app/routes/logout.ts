import type { ActionFunction } from "remix"
import { logout } from "~/lib/utils/session";

export const action: ActionFunction = ({ request }) => logout(request);

export default function () { }