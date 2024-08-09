import { ReactNode } from "react";

export default function ContainerHoc({ children, classes }: { children: ReactNode, classes?: string }) {
    return (
        <div className={`editor_section-gray ${classes ?? ""}`}>
            {children}
            <div className='editor_upload-plus'>+</div>
        </div>
    )
}
