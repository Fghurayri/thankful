import { Outlet, redirect } from "remix";
import type { LoaderFunction } from "remix"
import { Nav } from "~/lib/components/Nav";
import { CHECK_IN_ROUTE } from "~/lib/utils/consts";
import { isAlreadySignedIn } from "~/lib/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  if (!await isAlreadySignedIn(request)) return redirect(CHECK_IN_ROUTE);

  return {}
}

export default function App() {
  return (
    <div className="flex w-full h-screen">
      <Nav />
      <div className=" bg-gray-100 w-full overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}