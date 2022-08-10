import { NameIcon } from "../../interfaces"
import { Icon } from "../ui"

interface Props {
    icon: NameIcon
    title: string
    subtitle: string
    color?: 'accent' | 'info' | 'primary' | 'secondary' | 'black/70'
}

export const HeaderAdmin = ({ icon, title, subtitle, color = 'black/70' }: Props) => {
    return (
        <div className={`bg-base-300 border border-${color} mt-10 mb-16 py-2 px-5 rounded-md flex items-center gap-5 justify-start md:flex-row flex-col text-center`}>
            <h1 className="flex items-center gap-3 md:flex-row flex-col">
                <Icon name={icon} className={`text-5xl select-none`} />
                <span className={`text-${color} text-4xl font-bold select-none `}>{title}</span>
            </h1>
            <h2 className="text-xl select-none">( <span className={`text-${color} select-none`}>{subtitle}</span> )</h2>
        </div>

    )
}