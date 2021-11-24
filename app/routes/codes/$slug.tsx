import type { MetaFunction, LoaderFunction } from "remix"
import { useLoaderData, json, Link } from "remix"
type IndexData = {
  names: Array<{ name: string; id: string }>
  code: { name: string; active: boolean; id: string }
}

import { createSupabaseClient } from "../../supabaseClient"
import { PageWidth } from "~/PageWidth"
// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader

export async function loader({ params }) {
  const supabase = createSupabaseClient()

  const { data: code } = await supabase
    .from("codes")
    .select(`id, active, name`)
    .eq("id", params.slug)
    .single()

  const { data: names } = await supabase
    .from("profiles")
    .select(`id, name`)
    .eq("code_id", code.id)

  return json({ code, names })
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Loyalty",
    description: "Welcome to remix!",
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { code, names } = useLoaderData<IndexData>()

  const name = code.name || code.id.slice(0, 4)
  const link = `http://localhost:3000/codes/${code.id}`

  return (
    <div>
      <main className="px-4 py-4">
        <PageWidth>
          <div className="px-4 py-2 mb-8 rounded-lg shadow-sm bg-gray-50">
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900">
              Membership
            </h1>

            {names
              ? names.map((name) => (
                  <h3 className="mb-2 text-2xl font-semibold" key={name.id}>
                    {" "}
                    {name.name}{" "}
                  </h3>
                ))
              : null}

            <form
              onSubmit={(event) => {
                event.preventDefault()

                mutation.mutate({ active: !code.active })
              }}
            >
              <h2 className="tracking-wide text-gray-600">
                This membership is
                <span className="font-bold"> currently active </span>
              </h2>

              <button
                className={`border px-4 py-2 cursor-pointer rounded-md border-gray-300  text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                type="submit"
              >
                {code.active ? "Deactivate" : "Activate"}
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center px-2">
            <div className="border-8 border-white rounded-md">
              <QRCode value={link} size={196} />
            </div>
            <p className="px-2 mb-4 tracking-wide text-gray-600">
              {" "}
              Scan with your mobile device{" "}
            </p>
          </div>
        </PageWidth>
      </main>
    </div>
  )
}
