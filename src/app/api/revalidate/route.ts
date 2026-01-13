import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<{ _type: string }>(
            req,
            process.env.SANITY_REVALIDATE_SECRET,
        )

        if (!isValidSignature) {
            return new Response('Invalid Signature', { status: 401 })
        }

        if (!body?._type) {
            return new Response('Bad Request', { status: 400 })
        }

        // specific logic can be added here to check body._type
        // e.g. if (body._type === 'profile') ...

        // Trigger revalidation for the landing page
        revalidateTag('landing-page', 'max')

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body
        })
    } catch (err) {
        console.error(err)
        return new Response(err instanceof Error ? err.message : 'Unknown Error', { status: 500 })
    }
}
