import { NameIcon } from "../../interfaces"
import { Icon } from "./Icon"

interface Props {
    icon: NameIcon
    label: string
    type?: 'badge-error' | 'badge-success'
    className?: string
    isOutline?: boolean
}

export const Chip = ({ icon, label, className, isOutline = true, type = 'badge-error' }: Props) => {
    return (
        <div className={`badge ${type}  my-5 badge-lg flex gap-5 ${className} ${isOutline ? 'badge-outline' : ''}`}>
            <Icon name={icon} className="text-xl" />
            <span className="font-bold">{label}</span>
        </div>
    )
}