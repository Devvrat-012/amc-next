// app/pages/Blog/BlogPage.js (Server Component)
import React from 'react';
import BlogPageClient from '@/app/pages/Blog/BlogPageClient';
import { API_URL, getBlogsParam } from '@/app/constants/apiUrls';

export default async function BlogPage({ searchParams }) {
  let blogs = [];
  let blogsCount = 0;
  // Get the page number from search parameters (default to 1)
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  try {
    // Use fetch to call your API (use cache: 'no-store' to ensure fresh data)
    const res = await fetch(getBlogsParam(page), { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const data = await res.json();
    blogs = data.blog;
    blogsCount = data.count;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <BlogPageClient
      initialBlogs={blogs}
      initialBlogsCount={blogsCount}
      initialPageNumber={page}
    />
  );
}
