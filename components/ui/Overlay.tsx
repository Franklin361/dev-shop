interface Props {
    isFullScreen?: boolean
}
export const Overlay = ({ isFullScreen = false }: Props) => {
    return (
        <div className={`z-10 top-0 left-0 bg-black/70 ${isFullScreen ? 'fixed w-screen h-screen' : 'absolute w-full h-full'}`} />
    )
}