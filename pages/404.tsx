import { ShopLayout } from "../components"

// TODO: custom 404 with an image
const Custom404 = () => {
    return (
        <ShopLayout>
            <section className="p-5 flex justify-center flex-col items-center gap-5">
                <span className="text-9xl font-extrabold text-accent">404</span>
                <span className="text-5xl font-bold text-accent">Page Not Found</span>
            </section>
        </ShopLayout>
    )
}

export default Custom404