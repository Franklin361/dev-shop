
interface InputGroup {
    label: string
    values: string[]
    current: string | string[]
    name: string
    type?: 'checkbox' | 'radio'
    onChange: (type: string) => void
}

export const InputGroup = ({ label, onChange, current = '', values, name, type = 'radio' }: InputGroup) => {

    return (
        <div className='my-5'>
            <label className='text-lg w-full'> {label}</label>
            <hr className='mb-3 mt-2 border border-white/30' />
            <div className='flex gap-5 flex-wrap'>
                {
                    values.map(value => (
                        <label className='capitalize items-center gap-3 flex w-fit cursor-pointer select-none font-bold' key={value}>
                            <input
                                type={type}
                                name={name}
                                defaultChecked={type === 'checkbox' && current ? current.includes(value) : value.toLowerCase() === `${(current as string).toLowerCase()}`}
                                className={`${type} ${type}-secondary ${type}-md`}
                                onChange={() => onChange(value)}
                            />
                            {value}
                        </label>
                    ))
                }
            </div>
        </div>

    )
}
