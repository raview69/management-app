/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react"
import {
  setAddItems,
  setUpdateDataItems,
} from "@/redux/features/itemsDataSlice"
import { useDispatch } from "react-redux"
import { closeModal } from "@/redux/features/modalSlice"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

interface TodoFormProps {
  column: string
}

const TodoForm: React.FC<TodoFormProps> = ({ column }) => {
  const idRandom = Math.random().toString(36).substr(2, 4)
  const [data, setData] = useState({
    id: idRandom,
    title: "",
    col: column,
    description: "",
    priority: "medium",
  })
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const { id, title, col, description, priority } = useSelector(
    (state: {
      itemsUpdate: {
        id: string
        title: string
        col: string
        description: string
        priority: string
      }
    }) => state.itemsUpdate
  )

  useEffect(() => {
    if (id) {
      setData({
        id: id,
        title: title,
        col: col,
        description: description,
        priority: priority,
      })
    }
  }, [id])

  console.log(id)

  return (
    <div className="mt-10 w-[300px]">
      <div className="sm:col-span-3">
        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={data.title}
            onChange={handleChange}
            autoComplete="title-name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-3 my-4">
        <label
          htmlFor="description"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={data.description}
            onChange={handleChange}
            autoComplete="description-name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="priority"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Priority
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="priority"
            name="priority"
            value={data.priority ? data.priority : "medium"}
            onChange={(e) =>
              setData({
                ...data,
                priority: e.target.value,
              })
            }
            autoComplete="priority-name"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="sm:col-span-3 mt-10 flex justify-end">
        {id ? (
          <button
            onClick={() => {
              dispatch(setUpdateDataItems(data))
              dispatch(closeModal())
              toast.success("Update Task Success", {
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
            className="p-2 bg-green-500 rounded-md text-white text-center cursor-pointer"
          >
            Update
          </button>
        ) : (
          <button
            className="p-2 bg-[#006cb5] rounded-md text-white text-center cursor-pointer"
            onClick={() => {
              dispatch(setAddItems(data))
              dispatch(closeModal())
              toast.success("Add Task Success", {
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
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoForm
