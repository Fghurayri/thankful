export function AddPostForm() {
  return (
    <form method="post" action="/app/addPost" className="flex flex-col mt-8">
      <textarea
        required
        name="content"
        cols={15}
        rows={3}
        placeholder="what are you grateful for today?"
        className="px-4 py-2 w-full rounded-lg appearance-none"
      />
      <div className="flex justify-end mt-8">
        <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Post
        </button>
      </div>
    </form>
  )
}