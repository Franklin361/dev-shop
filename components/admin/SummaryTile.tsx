import { NameIcon } from "../../interfaces"
import { Icon } from "../ui"

interface Props {
    title: string | number
    subtitle: string
    icon: NameIcon
    color?: 'accent' | 'info' | 'primary' | 'secondary' | 'black/70' | 'error' | 'warning' | 'success'
}

export const SummaryTile = ({ icon, subtitle, title, color = 'info' }: Props) => {
    return (
        <div className={`bg-black/50 p-7 rounded-xl shadow-2xl shadow-black/70 flex items-center gap-5 border-${color} border`}>
            <Icon name={icon} className={`text-4xl text-${color} select-none`} />
            <div>
                <span className="font-bold text-4xl select-none">{title}</span>
                <h3 className="text-xl select-none">{subtitle}</h3>
            </div>
        </div>
    )
}