import type { Post, User } from "@prisma/client";
import { Post as SinglePost } from "~/lib/components/posts";

type Props = {
  user: User,
  posts: Post[]
}

export function PostsList({ posts, user }: Props) {
  const lastPost = posts.pop();
  return (
    <div className="flow-root mt-8">
      <ul role="list">
        {posts.map(p => <SinglePost key={p.id} post={p} user={user} />)}
        {lastPost && <SinglePost key={lastPost.id} post={lastPost} user={user} lastPost />}
      </ul>
    </div>
  )
}