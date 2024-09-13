import { ReactNode } from "react";
import { Field, useField, useForm } from 'react-final-form'

type PropsData = {
    children: ReactNode,
    isOpened?: boolean,
    classes?: string,
    errors: string | boolean | undefined,
    touched: boolean | undefined,
    field: string,
    image?: null | File
}

export default function ContainerHoc({ children, isOpened, classes, errors, touched, field, image }: PropsData) {
    const form = useForm();
    const handleClick = () => {
        if (isOpened) return
        form.change(`isOpened.${field}`, true)
    }
    return (
        <div className={`editor_section-gray ${classes ?? ""}`} onClick={handleClick}>
            {children}
            <div className="editor_upload-icon" >
                <Field name={`isOpened.${field}`} component="input" type="checkbox" />
                {!errors && touched ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                }

                {/* {(field === "image" || event[field]) && isAllFieldFull() ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>X</div>
                        : <div className="icon">+</div>
                } */}
            </div>
        </div>
    )
}
