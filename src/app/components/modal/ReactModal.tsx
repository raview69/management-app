"use client"

import React from "react"
import Modal from "react-modal"
import { MdClose } from "react-icons/md"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },

  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
}

if (typeof window !== "undefined") {
  Modal.setAppElement("body")
}

interface ModalProps {
  children: React.ReactNode
  modalIsOpen: boolean
  modalClose: () => void
}

const ReactModal: React.FC<ModalProps> = ({
  children,
  modalIsOpen,
  modalClose,
}) => {
  return (
    <div className="bg-white">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <button onClick={modalClose} className="float-right cursor-pointer">
            <MdClose className="text-2xl text-black" />
          </button>
        </div>
        <div>{children}</div>
      </Modal>
    </div>
  )
}

export default ReactModal
