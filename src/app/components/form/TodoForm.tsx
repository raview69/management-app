/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import { RiArrowUpWideFill } from "react-icons/ri"
import { FaGripLines } from "react-icons/fa6"
import { setAddItems } from "@/redux/features/itemsDataSlice"
import { useDispatch } from "react-redux"
import { closeModal } from "@/redux/features/modalSlice"

interface TodoFormProps {
  col: string
  updateData: any
}

const TodoForm: React.FC<TodoFormProps> = ({ col, updateData }) => {
  const idRandom = Math.random().toString(36).substr(2, 4)
  const [data, setData] = useState({
    id: idRandom,
    title: "",
    col: col,
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

  console.log(data)

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
            defaultValue={data.priority}
            id="priority"
            name="priority"
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
        <button
          onClick={() => {
            dispatch(setAddItems(data))
            dispatch(closeModal())
          }}
          className="text-black cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default TodoForm
