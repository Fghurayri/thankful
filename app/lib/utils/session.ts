import { createCookieSessionStorage, redirect } from "remix";
import { ensureUserByMnemonicExists, getUser } from "~/lib/models/user";
import { APP_ROUTE, CHECK_IN_ROUTE, COOKIE_KEY } from "~/lib/utils/consts";
import { hash } from "~/lib/utils/hash";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__thankful_session",
      httpOnly: true,
      maxAge: 604_800, // one week
      path: "/",
      sameSite: "strict",
      secrets: [process.env.SECRET!],
      secure: process.env.NODE_ENV === 'production'
    }
  });

export async function checkIn(mnemonic: string): Promise<Response> {
  const hashedMnemonic = hash(mnemonic);
  await ensureUserByMnemonicExists(hashedMnemonic);

  const session = await getSession();
  session.set(COOKIE_KEY, hashedMnemonic);

  return redirect(APP_ROUTE, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}

export async function logout(request: Request): Promise<Response> {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  return redirect(CHECK_IN_ROUTE, {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}

// TODO: Revisit the logic to decide if a user is already signed in or not. 
// This works now because of `max-age` in cookie option forcing to have a valid cookie.
export async function isAlreadySignedIn(request: Request): Promise<Boolean> {
  return await getUserFromCookie(request) !== null;
}

export async function getUserFromCookie(request: Request) {
  const hashedMnemonic = await extractMnemonicFromCookie(request);
  if (typeof hashedMnemonic !== "string") return null;

  const user = await getUser(hashedMnemonic);
  if (user === null) return null;

  return user;
}

export async function extractMnemonicFromCookie(request: Request) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  return session.get(COOKIE_KEY) as string | undefined;
}
