import { NameIcon } from "../../interfaces"
import { Icon } from "../ui"

interface Props {
    title: string | number
    subtitle: string
    icon: NameIcon
}

export const SummaryTile = ({ icon, subtitle, title }: Props) => {
    return (
        <div>
            <Icon name={icon} />
            <div>
                <span>{title}</span>
                <h3>{subtitle}</h3>
            </div>
        </div>
    )
}