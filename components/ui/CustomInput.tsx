import { DeepRequired, FieldErrorsImpl, Path, UseFormRegister } from "react-hook-form"

interface Props {
    type?: 'text' | 'number'
    title: string;
    label: Path<any>;
    register: UseFormRegister<any>;
    required?: boolean;
    errors: any
    validation?: any
    [x: string]: any
}

export const CustomInput = ({ label, type = 'text', register, title, required = true, errors, validation, ...props }: Props) => {

    return (

        <div className='flex flex-col gap-3 mt-3'>
            <label className='text-lg' htmlFor={label}>{title}</label>
            <input
                type={type}
                id={label}
                className={`input input-secondary ${errors?.[label] ? 'input-error' : ''}`}
                {...register(label, {
                    required: required && 'This field is required',
                    ...validation
                })}
                {...props}
            />
            {
                errors?.[label] && <p className="my-1 text-sm text-error">{errors[label].message}</p>
            }
        </div>
    )
}

export const CustomTextArea = ({ label, register, title, required = true, errors, validation, ...props }: Props) => {

    return (

        <div className='flex flex-col gap-3 mt-3'>
            <label className='text-lg' htmlFor={label}>{title}</label>
            <textarea
                id={label}
                className={`textarea textarea-secondary resize-none h-36 ${errors?.[label] ? 'textarea-error' : ''}`}
                {...register(label, {
                    required: required && 'This field is required',
                    ...validation
                })}
                {...props}
            />
            {
                errors?.[label] && <p className="my-1 text-sm text-error">{errors[label].message}</p>
            }
        </div>
    )
}