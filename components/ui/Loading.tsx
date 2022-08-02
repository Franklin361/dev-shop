interface Props {
    label?: string
    center?: boolean
    textClass?: string
}
export const Loading = ({ label, center = true, textClass }: Props) => {
    return (
        <div className={`${center ? 'text-center my-8' : ''}`}>
            <div className={`momentum ${center ? 'mx-auto' : ''}`} />
            {label && <span className={` ${textClass}`}> {label} </span>}
        </div>
    )
}