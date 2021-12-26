import type { User } from "@prisma/client";
import { db } from "~/lib/clients/db";

// find or create user
export async function ensureUserByMnemonicExists(hashedMnemonic: string) {
  let user = await db.session.findUnique({ where: { hashedMnemonic } }).user();

  if (user === null) {
    user = await db.user.create({
      data: {
        Session: {
          create: {
            hashedMnemonic
          }
        }
      },
    })
  }
  return;
}

export async function getUser(hashedMnemonic: string) {
  return await db.session.findUnique({ where: { hashedMnemonic } }).user();
}

export async function updateUserName({ user, name }: { user: User, name: string | null }) {
  return await db.user.update({ where: { id: user.id }, data: { name } });
}

export async function updateUserAvatar({ user, avatar }: { user: User, avatar: string | null }) {
  return await db.user.update({ where: { id: user.id }, data: { avatar } });
}