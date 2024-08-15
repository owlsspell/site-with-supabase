import { ReactNode } from "react";

export default function ContainerHoc({ children, classes, isOpened, field, changeVisibility }: { children: ReactNode, classes?: string, isOpened: boolean, field: string, changeVisibility: (field: string, value: boolean) => void }) {
    return (
        <div className={`editor_section-gray ${classes ?? ""}`}>
            {children}
            <div className="editor_upload-icon" onClick={() => changeVisibility(field, !isOpened)}>
                {isOpened ?
                    <div className='icon editor_upload-close'>x</div>
                    : <div className="icon">+</div>
                }
            </div>
        </div>
    )
}
