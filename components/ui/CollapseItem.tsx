import { useState } from "react"
import { Element } from "../../interfaces"
import { Icon } from "./Icon"

interface Props {
  children: Element
  title: string
}
export const CollapseItem = ({ children, title }: Props) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border fade-in rounded-md overflow-hidden ${isOpen ? 'border-secondary bg-black/70' : ''}`}>
      <div className=" p-3 cursor-pointer select-none flex justify-between items-center" onClick={() => setIsOpen(prev => !prev)}>
        <p className={`${isOpen ? 'font-bold text-secondary' : ''} `} >{title}</p>
        <Icon name="down" className={`text-3xl transition-all ease-in ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {
        isOpen && children
      }
    </div >
  )
}