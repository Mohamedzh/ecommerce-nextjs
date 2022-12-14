import React from 'react'

type props = {
  values: string[] | number[]
  defaultValue?: string | number
  onChange: (value: string) => void
  Qty: number
}
function Dropdown({ values, onChange, Qty }: props) {
  return (
    <select
      id="quantity"
      name="quantity"
      onChange={(e) => { onChange(e.target.value) }}
      className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      defaultValue={Qty}
    >
      {values.map((i, idx) => {
        return <option key={idx} value={i}>{i}</option>
      })}
    </select>
  )
}

export default Dropdown
