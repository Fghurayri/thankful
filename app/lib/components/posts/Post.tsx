import type { Post, User } from "@prisma/client"
import { formatTimeAgo } from "~/lib/utils/time"


type Props = {
  user: User;
  post: Post;
  lastPost?: boolean
}

export function Post({ post, user, lastPost = false }: Props) {
  return (
    <li>
      <div className="relative pb-8">
        {!lastPost && <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />}
        <div className="relative flex items-start space-x-3">
          <Avatar src={user.avatar} />
          <div className="min-w-0 flex-1">
            <div>
              <Name name={user.name} />
              <p className="mt-0.5 text-xs text-gray-400">
                {formatTimeAgo(post.createdAt)}
              </p>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <p>
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function Avatar({ src }: { src: string | null }) {
  if (src === null) {
    return (
      <div>
        <div className="relative px-1">
          <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>

            <span className="absolute -bottom-4 -right-1 bg-white rounded-tl px-0.5 py-px">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <img src={src} className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" alt="" />
      <span className="absolute -bottom-4 -right-1 bg-white rounded-tl px-0.5 py-px">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        </svg>
      </span>
    </div>
  )
}

function Name({ name }: { name: string | null }) {
  return (
    <div className="text-sm">
      <p className="font-medium text-gray-900">{name ?? "Anonymous"}</p>
    </div>
  )
}