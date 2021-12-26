import { redirect } from "remix";
import type { LoaderFunction } from "remix"
import { APP_ROUTE } from "~/lib/utils/consts";
import { isAlreadySignedIn } from "~/lib/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  if (await isAlreadySignedIn(request)) return redirect(APP_ROUTE);

  return {}
}

export default function Index() {
  return (
    <div className="h-screen">
      <main
        className="h-full bg-cover bg-top"
        style={{ backgroundImage: `url('/journal.jpeg')` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
          <h1 className="mt-6 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Thankful</h1>
          <p className="mt-6 text-lg font-medium text-white text-opacity-70">
            Jot something you are grateful for, at leaset once, everyday! 🙏
          </p>
          <CheckInForm />
          <p className="mt-6 text-sm font-medium text-white text-opacity-50 italic">
            💡 We never know who you are and what's your <a href="/password-ccs16.pdf" className="underline text-indigo-600">secret mnemonic.</a>
          </p>
        </div>
      </main>
    </div>
  )
}

function CheckInForm() {
  return (
    <form method="post" action="/check-in" className="mt-6">
      <input
        required
        name="mnemonic"
        placeholder="your secret mnemonic"
        className="inline-flex px-4 py-2 border border-transparent text-sm font-medium text-gray-600 text-opacity-75 bg-white bg-opacity-25 hover:bg-opacity-50 placeholder-gray-50 placeholder-opacity-70"
      />
      <button
        type="submit"
        className="px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 sm:mt-0"
      >
        Check in
      </button>
    </form>
  )
}