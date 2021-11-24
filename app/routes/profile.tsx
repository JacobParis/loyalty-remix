import type { MetaFunction, LoaderFunction } from "remix"
import { useLoaderData, json, Link } from "remix"
import { Outlet } from "react-router-dom"

type IndexData = {
  codes: Array<Code>
}

type Code = { name: string; id: string }

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async () => {
  const supabase = createSupabaseClient()

  console.log("Loader called")
  const {
    data: codes,
    error,
    status,
  } = await supabase.from("codes").select(`id, active, name`)

  if (error && status !== 406) {
    throw error
  }

  // https://remix.run/api/remix#json
  return json({ codes })
}

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { codes } = useLoaderData<IndexData>()

  return (
    <div>
      <header className="py-8 border-t border-b">
        <PageWidth>
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-gray-900">
            Home
          </h1>
          <h2 className="tracking-wide text-gray-600">Manage account</h2>
        </PageWidth>
      </header>

      <main>
        <ul className="grid gap-4 px-4 py-2">
          {codes
            ? codes.map((code) => <CodeCard code={code} key={code.id} />)
            : null}
        </ul>
        <Outlet />
      </main>
    </div>
  )
}

import Modal from "react-modal"
import { PageWidth } from "~/PageWidth"
import { createSupabaseClient } from "~/supabaseClient"
Modal.setAppElement(".remix-app")

function CodeCard({ code }: { code: Code }) {
  const name = code.name || code.id.slice(0, 4)
  const link = `/codes/${code.id}`

  return (
    <li className="flex justify-between p-2 border rounded-md hover:bg-gray-50">
      <div>
        <p className="text-xl font-bold">
          <Link to={link}>{name}</Link>
        </p>
        <small className="text-xs opacity-75"> Active </small>
      </div>

      <div className="flex justify-end gap-2">
        <Link to={`${code.id}`}>
          <IconQR />
        </Link>

        <Link to={link}>
          <IconLink />
        </Link>
      </div>
    </li>
  )
}

function IconQR() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
      ></path>
    </svg>
  )
}

function IconLink() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
