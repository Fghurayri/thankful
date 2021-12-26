import { redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix"
import type { User } from "@prisma/client";
import { CHECK_IN_ROUTE } from "~/lib/utils/consts";
import { getUserFromCookie } from "~/lib/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromCookie(request);
  if (user === null) return redirect(CHECK_IN_ROUTE);
  return user;
}


export default function Profile() {
  const user = useLoaderData<User>()
  return (
    <div className="flex flex-col h-screen justify-around">
      <div>
        <ProfileEntryForm
          action="/app/profile/updateName"
          defaultValue={user.name}
          name="name"
          placeholder="your name..."
        />

        <ProfileEntryForm
          action="/app/profile/updateAvatar"
          defaultValue={user.avatar}
          name="avatar"
          placeholder="your avatar link..."
        />
      </div>

      <form method="post" action="/logout">
        <button type="submit" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Logout
        </button>
      </form>

    </div>
  )
}

type ProfileEntryFormProp = { defaultValue: string | null, name: string, action: string, placeholder: string }

function ProfileEntryForm({ defaultValue, name, action, placeholder }: ProfileEntryFormProp) {
  return (
    <form method="post" className="flex pt-8 w-full" name={name} action={action}>
      <input name={name} placeholder={placeholder} className="px-4 py-2 w-full" defaultValue={defaultValue ?? ""} required />
      <div className="flex-shrink-0">
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </button>
      </div>
    </form>
  )
}