import { Overlay } from "./Overlay"

export const HeaderHome = () => {
    return (
        <header className=' bg-[url("https://i.pinimg.com/736x/e7/b1/e2/e7b1e231979b4603ff0489f372998e74.jpg")] bg-center bg-no-repeat bg-cover min-h-[60vh] flex justify-center items-center flex-col gap-5 relative rounded-b-lg overflow-hidden'>

            <h1 className='font-normal lg:text-8xl  md:text-6xl text-5xl z-20'>
                <span className='font-extrabold'>Dev</span>
                Shop
            </h1>
            <h2 className='z-20 lg:text-2xl text-xl text-center'> Found all the products you need! </h2>
            <Overlay />

        </header>
    )
}