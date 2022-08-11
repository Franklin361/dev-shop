import Image from "next/image"
import { forwardRef } from "react"

interface IImagesForm {
    onFilesSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDeleteImage: (img: string) => void
    images: string[]
}

const ImagesForm = forwardRef<HTMLInputElement, IImagesForm>(({ images = [], onDeleteImage, onFilesSelected }, ref) => {

    return (

        <div className='flex flex-col gap-3'>
            <label className='text-lg'>Images</label>
            <input
                type="file"
                ref={ref}
                onChange={onFilesSelected}
                accept='image/png, image/gif, image/jpeg'
                multiple
                className='hidden'
            />
            <button className='btn' type='button' onClick={() => (ref as React.RefObject<HTMLInputElement>).current?.click()}>Upload image</button>
            {
                images.length < 2 && <span className='text-red-500 text-center p-2 font-bold'>Add minimum 2 images</span>
            }

            <div className='grid lg:grid-cols-3 grid-cols-2 gap-5 my-5'>
                {
                    images.length !== 0 && images.map(img => (

                        <div className='flex flex-col gap-3 items-center' key={img}>
                            <div className='relative w-full h-32'>
                                <Image
                                    src={img}
                                    layout='fill'
                                    className='object-cover rounded-md'
                                    alt={img}
                                />
                            </div>
                            <button className='btn btn-error' onClick={() => onDeleteImage(img)}
                            >Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>

    )
})
ImagesForm.displayName = 'ImagesForm';
export default ImagesForm