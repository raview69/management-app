/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import Column from "@/app/components/column/Column"
import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"

export default function Home() {
  const { columns, items, columnsOrderState } = useSelector(
    (state: {
      itemsData: { columns: any; items: any; columnsOrderState: any }
    }) => state?.itemsData
  )
  const [columnsOrder, setColumnsOrder] = useState(columnsOrderState)
  const [data, setData] = useState(columns)

  useEffect(() => {
    setColumnsOrder(columnsOrderState)
    setData(columns)
  }, [columnsOrderState, columns])

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    const sourceIndex = source.index
    const destinationIndex = destination.index

    if (type === "COLUMN") {
      const reorderedColumns = [...columnsOrder]
      const [removedItem] = reorderedColumns.splice(sourceIndex, 1)
      reorderedColumns.splice(destinationIndex, 0, removedItem)
      setColumnsOrder(reorderedColumns)
      return
    } else {
      if (source.droppableId === destination.droppableId) {
        const source_col_id = source.droppableId
        const new_items_id_collection = [
          ...data[source_col_id as keyof typeof data].itemsOrder,
        ]
        const [deleted_item_id] = new_items_id_collection.splice(sourceIndex, 1)
        new_items_id_collection.splice(destinationIndex, 0, deleted_item_id)

        // Create a deep copy and update only the specific column
        const new_data = {
          ...data,
          [source_col_id]: {
            ...data[source_col_id as keyof typeof data],
            itemsOrder: new_items_id_collection,
          },
        }
        setData(new_data)
      } else {
        const source_col_id = source.droppableId
        const dest_col_id = destination.droppableId

        const new_source_items_id_collc = [
          ...data[source_col_id as keyof typeof data].itemsOrder,
        ]
        const new_dest_items_id_collc = [
          ...data[dest_col_id as keyof typeof data].itemsOrder,
        ]
        const [deleted_item_id] = new_source_items_id_collc.splice(
          sourceIndex,
          1
        )
        new_dest_items_id_collc.splice(destinationIndex, 0, deleted_item_id)

        // Create a deep copy and update both columns
        const new_data = {
          ...data,
          [source_col_id]: {
            ...data[source_col_id as keyof typeof data],
            itemsOrder: new_source_items_id_collc,
          },
          [dest_col_id]: {
            ...data[dest_col_id as keyof typeof data],
            itemsOrder: new_dest_items_id_collc,
          },
        }
        setData(new_data)
      }
    }
  }

  return (
    <div className="flex h-full w-full items-center  flex-col">
      <p className="font-bold text-4xl bg-gradient-to-r from-purple-600 via-blue-400 to-indigo-400  mt-10 text-transparent bg-clip-text">
        MANAGMENET APP
      </p>
      {/* Set up DragDropContext */}
      <DragDropContext onDragEnd={handleDragDrop}>
        {/* Render Droppable area for columns */}
        <Droppable droppableId="ROOT" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="flex  items-center w-full md:max-w-6xl justify-center border min-h-96 py-4 mt-6 rounded-md overflow-x-scroll md:overflow-hidden"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* Map through columnsOrder to render each column */}
              {columnsOrder.map((colId: string, index: number) => {
                const columnData = data[colId]
                return (
                  <Draggable
                    draggableId={columnData.id}
                    key={columnData.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="rounded-md border flex flex-col max-w-xs mx-3"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-80 gap-2 hover:bg-gray-600 p-4 border-b border-b-gray-700 rounded-t-md"
                        >
                          <p className="text-xl font-bold">
                            {columnData.title}
                          </p>
                        </div>

                        {/* Render items within the column */}
                        <Column {...columnData} ITEMS={items} />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToastContainer />
    </div>
  )
}
