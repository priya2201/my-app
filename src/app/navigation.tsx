import Link from 'next/link'
import React from 'react'

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link href="/">All Posts</Link></li>
        <li> <Link href="/AddPost">Add Post </Link></li>
        <li> <Link href="/EditPost">Edit Post</Link></li>
        <li> <Link href="/DeletePost">Delete Post</Link></li>

      </ul>
    </nav>
  )
}

export default Navigation