"use client"
import { useParams } from 'next/navigation'
import UpdateAuthorForm from '@/app/components/authors/UpdateAuthorForm'

export default function UpdateAuthorPage() {
  const params = useParams()
  const authorId = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  if (authorId === null || isNaN(authorId)) {
    return <div>Invalid author ID</div>
  }

  return (
    <div>
      <h1>Update Author</h1>
      <UpdateAuthorForm authorId={authorId} />
    </div>
  )
}