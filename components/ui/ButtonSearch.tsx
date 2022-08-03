import { Icon } from "./Icon"
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const ButtonSearch = () => {

    const { push } = useRouter()
    const [isHidden, setIsHidden] = useState(true)
    const [searchText, setSearchText] = useState('');

    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim().length === 0) return
        push(`/search/${searchText}`)
        setSearchText('')
        setIsHidden(true)
    }

    useEffect(() => {
        if (!isHidden) inputRef.current?.focus()
    }, [isHidden])


    return (
        <>
            {
                isHidden
                    ?
                    <div
                        className="rounded-full fade-in hover:bg-white/20 cursor-pointer p-2 md:block hidden "
                        onClick={() => setIsHidden(false)}
                        key={`${isHidden}`}
                    >
                        <Icon name="search" className="text-3xl" />
                    </div>
                    : <div className="center gap-2 md:flex hidden fade-in">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text" placeholder="Type here"
                                className="input input-bordered input-accent w-full input-sm"
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                ref={inputRef}
                            />
                        </form>
                        <Icon onClick={() => setIsHidden(true)} name="close" className="text-2xl cursor-pointer" />
                    </div>
            }
        </>
    )
}