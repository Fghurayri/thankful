import type { User } from "@prisma/client";
import { db } from "~/lib/clients/db";

export async function getPosts(user: User) {
  return await db.post.findMany({ where: { user }, orderBy: { createdAt: "desc" } })
}

export async function addPost(user: User, content: string) {
  return await db.post.create({
    data: {
      content,
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })
}