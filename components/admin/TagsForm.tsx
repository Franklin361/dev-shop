
interface ITagsForm {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onDeleteTag: (tag: string) => void
    value: string
    tags: string[]
}

export const TagsForm = ({ tags, onDeleteTag, ...props }: ITagsForm) => {
    return (
        <div className='flex flex-col gap-3'>
            <label className='text-lg mt-3' htmlFor="6">Tags</label>
            <input type="text" id='6' name="" className='input input-secondary'
                {...props}
            />

            <span className=" text-sm">Press <b>[spacebar]</b> to add tag</span>

            <div className='flex gap-2 flex-wrap mt-2'>
                {
                    tags.map(tag => (
                        <div
                            className="badge badge-secondary font-bold hover:badge-error cursor-pointer"
                            key={tag}
                            onClick={() => onDeleteTag(tag)}
                        >{tag}</div>
                    ))
                }
            </div>
        </div>

    )
}
