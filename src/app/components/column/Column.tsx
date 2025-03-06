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
import { setUpdateDataItems } from "@/redux/features/itemsDataSlice"

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
            className="flex flex-col w-full min-h-60 h-fit"
          >
            {itemsOrder.map((item_id, index) => {
              const item = ITEMS[item_id]

              return (
                item?.id && (
                  <Draggable draggableId={item?.id} index={index} key={index}>
                    {(provided) => (
                      <div
                        className="border-b  rounded-md flex flex-col p-2 m-2 bg-pink-500"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <p className="font-bold text-lg ">{item?.title}</p>
                        <p className="font-bold text-lg ">
                          {item?.description}
                        </p>
                        <p className="font-bold text-lg ">{item?.priority}</p>
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
                          Edit
                        </div>
                        <div
                          onClick={() => {
                            dispatch(
                              setRemoveItems({
                                id: item?.id,
                                col: id,
                              })
                            )
                          }}
                        >
                          remove
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
              className="p-2 bg-green-500 rounded-md text-white text-center cursor-pointer"
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
