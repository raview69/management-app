"use client"

import React from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"

interface ColumnProps {
  itemsOrder: string[]
  id: string
  ITEMS: Record<string, { id: string; title: string }>
}

const Column = ({ itemsOrder, id, ITEMS }: ColumnProps) => {
  // console.log(ITEMS)
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="flex flex-col w-full min-h-60 h-fit"
        >
          {itemsOrder.map((item_id, index) => {
            const item = ITEMS[item_id]

            return (
              <Draggable draggableId={item?.id} index={index} key={item?.id}>
                {(provided) => (
                  <div
                    className="border-b  rounded-md flex flex-col p-2 m-2 bg-pink-500"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <p className="font-bold text-lg ">{item?.title}</p>
                    <p className="font-bold text-lg ">{item?.id}</p>
                    <button
                      onClick={() => {
                        localStorage.removeItem(`ITEMS["${item}"]`)
                        console.log("removed")
                      }}
                    >
                      remove
                    </button>
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Column
