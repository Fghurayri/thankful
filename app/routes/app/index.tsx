import { redirect, useLoaderData } from "remix"
import type { LoaderFunction } from "remix"
import type { Post, User } from "@prisma/client";
import { Dreamer } from "~/lib/components/Dreamer";
import { AddPostForm, PostsList } from "~/lib/components/posts";
import { getPosts } from "~/lib/models/post";
import { CHECK_IN_ROUTE } from "~/lib/utils/consts";
import { getUserFromCookie } from "~/lib/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromCookie(request);
  if (user === null) return redirect(CHECK_IN_ROUTE);

  // TODO: get the user AND the post in a single DB trip.
  return {
    user,
    posts: await getPosts(user)
  }
}

export default function Timeline() {
  const { user, posts } = useLoaderData<{ user: User, posts: Post[] }>()
  const noPostsYet = posts.length === 0;

  return (
    <div className={`flex flex-col ${noPostsYet && "justify-between"} h-screen`}>
      <AddPostForm />
      {noPostsYet ? <Dreamer /> : <PostsList posts={posts} user={user} />}
    </div>
  )
}