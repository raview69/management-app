"use client"

import React from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { useDispatch } from "react-redux"
import { setAddItems } from "@/redux/features/itemsDataSlice"

interface ColumnProps {
  itemsOrder: string[]
  id: string
  ITEMS: Record<string, { id: string; title: string }>
}

const Column = ({ itemsOrder, id, ITEMS }: ColumnProps) => {
  console.log(id)

  const dispatch = useDispatch()
  const itemsLength = Object.keys(ITEMS).length

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
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
          <div
            onClick={() => {
              dispatch(
                setAddItems({
                  // columnId: id,
                  id: `item-${itemsLength + 1}`,
                  title: `Item ${itemsLength + 1}`,
                  col: id,
                })
              )
            }}
            className="p-2 bg-green-500 rounded-md text-white text-center cursor-pointer"
            style={{ width: "fit-content" }}
          >
            Add item
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default Column
