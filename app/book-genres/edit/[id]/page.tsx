"use client"
import { useParams } from 'next/navigation'
import UpdateAuthorForm from '@/app/components/authors/UpdateAuthorForm'
import UpdateBookGenreForm from '@/app/components/book-genres/UpdateBookGenreForm'

export default function UpdateAuthorPage() {
  const params = useParams()
  const bookGenreId = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  if (bookGenreId === null || isNaN(bookGenreId)) {
    return <div>Invalid bookGenreId ID</div>
  }

  return (
    <div>
      <h1>Update BookGenre</h1>
      <UpdateBookGenreForm bookGenreId={bookGenreId} />
    </div>
  )
}