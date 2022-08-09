import { NameIcon } from "../../interfaces"
import { Icon } from "../ui"

interface Props {
    icon: NameIcon
    title: string
    subtitle: string
}

export const HeaderAdmin = ({ icon, title, subtitle }: Props) => {
    return (
        <>
            <h1>
                <Icon name={icon} />
                <span>{title}</span>
            </h1>
            <h2>{subtitle}</h2>
        </>

    )
}