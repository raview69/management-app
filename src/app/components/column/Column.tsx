/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { useDispatch } from "react-redux"
import { setRemoveItems } from "@/redux/features/itemsDataSlice"
import ReactModal from "../modal/ReactModal"
import TodoForm from "../form/TodoForm"
import { useSelector } from "react-redux"
import { openModal, closeModal } from "@/redux/features/modalSlice"
import { changeColumn } from "@/redux/features/columnSlice"
import {
  setUpdateItems,
  setResetItems,
} from "@/redux/features/itemsUpdateSlice"
import { toast } from "react-toastify"
import { RiArrowUpWideFill } from "react-icons/ri"
import { FaGripLines } from "react-icons/fa6"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

interface ColumnProps {
  itemsOrder: string[]
  id: string
  ITEMS: Record<
    string,
    { id: string; title: string; description: string; priority: string }
  >
}

const Column = ({ itemsOrder, id, ITEMS }: ColumnProps) => {
  const dispatch = useDispatch()
  const { columnPlace } = useSelector(
    (state: { columns: { columnPlace: string } }) => state.columns
  )

  const { isOpen } = useSelector(
    (state: { modal: { isOpen: boolean } }) => state.modal
  )

  return (
    <div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="flex flex-col w-full min-h-80 h-fit"
          >
            {itemsOrder.map((item_id, index) => {
              const item = ITEMS[item_id]

              return (
                item?.id && (
                  <Draggable draggableId={item?.id} index={index} key={index}>
                    {(provided) => (
                      <div
                        className="border rounded-md flex flex-col p-4 m-2 bg-white text-black"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className="flex justify-between">
                          <p className="font-bold text-lg ">{item?.title}</p>
                          {item?.priority === "high" && (
                            <p className="font-bold text-lg ">
                              <RiArrowUpWideFill className="text-2xl text-red-600" />
                            </p>
                          )}
                          {item?.priority === "low" && (
                            <p className="font-bold text-lg ">
                              <RiArrowUpWideFill className="text-2xl text-blue-600 rotate-180" />
                            </p>
                          )}
                          {item?.priority === "medium" && (
                            <p className="font-bold text-lg ">
                              <FaGripLines className="text-2xl text-amber-400 rotate-180" />
                            </p>
                          )}
                        </div>
                        <div className="min-h-20 flex items-center justify-start">
                          <p className="">{item?.description}</p>
                        </div>

                        <div className="flex justify-between">
                          <div
                            onClick={() => {
                              dispatch(openModal())
                              dispatch(
                                setUpdateItems({
                                  id: item.id,
                                  title: item.title,
                                  col: id,
                                  description: item.description,
                                  priority: item.priority,
                                })
                              )
                            }}
                          >
                            <AiFillEdit className="text-2xl text-black cursor-pointer" />
                          </div>
                          <div
                            onClick={() => {
                              dispatch(
                                setRemoveItems({
                                  id: item?.id,
                                  col: id,
                                })
                              )
                              toast.success("Delete Task Success", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              })
                            }}
                          >
                            <MdDelete className="text-2xl text-red-600 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              )
            })}
            {provided.placeholder}
            <div
              onClick={() => {
                dispatch(setResetItems())
                dispatch(openModal())
                dispatch(changeColumn(id))
              }}
              className="p-2 bg-[#006cb5] rounded-md text-white text-center cursor-pointer ml-2 mb-2"
              style={{ width: "fit-content" }}
            >
              Add item
            </div>
          </div>
        )}
      </Droppable>
      <ReactModal
        modalIsOpen={isOpen}
        modalClose={() => dispatch(closeModal())}
      >
        <div>
          <TodoForm column={columnPlace} />
        </div>
      </ReactModal>
    </div>
  )
}

export default Column
