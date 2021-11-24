import { Link } from "remix"

import QRCode from "react-qr-code"
import Modal from "react-modal"
import { useParams, useNavigate } from "react-router-dom"
import invariant from "tiny-invariant"
Modal.setAppElement(".remix-app")

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { slug: id } = useParams()

  invariant(id, "Must have a code ID")

  const navigate = useNavigate()

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => navigate("..")}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.8)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
        },
      }}
    >
      <div className="flex justify-end px-2 py-2">
        <Link to="..">
          <IconClose />
        </Link>
      </div>
      <div className="flex flex-col items-center px-2">
        <div className="border-8 border-white rounded-md">
          <QRCode value={`codes/${id}`} size={196} />
        </div>
        <p className="px-2 mb-4 tracking-wide text-gray-600">
          Scan with your mobile device
        </p>
      </div>
    </Modal>
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
