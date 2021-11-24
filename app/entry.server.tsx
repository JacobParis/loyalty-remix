import { renderToString } from "react-dom/server"
import { RemixServer } from "remix"
import type { EntryContext } from "remix"
console.log("Entry server", process.env.NEXT_PUBLIC_SUPABASE_URL)

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  console.log("Entry server", process.env.NEXT_PUBLIC_SUPABASE_URL)
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set("Content-Type", "text/html")

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
