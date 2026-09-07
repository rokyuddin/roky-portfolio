import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-07',
  token,
  useCdn: false,
})

const POST_SLUG = 'nextjs-performance-optimization'
const CASE_STUDY_SLUG = 'altseo'

async function linkAltseo() {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ _id, title, relatedCaseStudies }`,
    { slug: POST_SLUG },
  )

  if (!post) {
    console.error(`Post "${POST_SLUG}" not found in Sanity`)
    process.exit(1)
  }

  const current = post.relatedCaseStudies ?? []
  if (current.includes(CASE_STUDY_SLUG)) {
    console.log(`"${post.title}" already references "${CASE_STUDY_SLUG}". No change needed.`)
    return
  }

  const updated = [...current, CASE_STUDY_SLUG]
  await client.patch(post._id).set({ relatedCaseStudies: updated }).commit()
  console.log(`Updated "${post.title}" relatedCaseStudies -> [${updated.join(', ')}]`)
}

linkAltseo().catch((err) => {
  console.error(err)
  process.exit(1)
})