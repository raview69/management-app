"use client"

import React from "react"
import Modal from "react-modal"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
  const subtitle: HTMLHeadingElement | null = null

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    if (subtitle) {
      subtitle.style.color = "#f00"
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={modalClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={modalClose}>close</button>
        <div>I am a modal</div>
        <form>{children}</form>
      </Modal>
    </div>
  )
}

export default ReactModal
