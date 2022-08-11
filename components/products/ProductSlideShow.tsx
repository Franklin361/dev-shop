import Image from 'next/image';
import { Slide } from 'react-slideshow-image';

interface Props {
    images: string[]
}



export const ProductSlideShow = ({ images = [] }: Props) => {
    return (
        <Slide
            easing='ease'
            autoplay
            duration={7000}
            indicators={() => <div className="indicator_slide" />}
            canSwipe
            infinite
            transitionDuration={500}
        >
            {images.map((slideImage, index) => (
                <img
                    key={index}
                    src={`${slideImage}`}
                    className="w-10/12 block mx-auto object-contain rounded"
                />
            ))}
        </Slide>
    )
}

