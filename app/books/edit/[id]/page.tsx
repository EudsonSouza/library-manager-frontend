"use client"

import { useParams } from 'next/navigation'
import UpdateBookForm from '@/app/components/books/UpdateBookForm'

export default function UpdateBookPage() {
  const params = useParams()
  const bookId = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  if (bookId === null || isNaN(bookId)) {
    return <div>Invalid Book ID</div>
  }

  return (
    <div>
      <h1>Update Book</h1>
      <UpdateBookForm bookId={bookId} />
    </div>
  )
}