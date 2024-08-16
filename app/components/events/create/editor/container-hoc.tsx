import { EventsState } from "@/lib/features/eventDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { ReactNode, useMemo } from "react";

export default function ContainerHoc({ children, classes, isOpened, field, changeVisibility }: { children: ReactNode, classes?: string, isOpened: boolean, field: string, changeVisibility: (field: string, value: boolean) => void }) {
    const event = useAppSelector((state: RootState) => state.eventData)

    const isAllFieldFull = () => {
        if (!event[field as keyof EventsState]) return
        return Object.values(event[field as keyof EventsState]).every((item) => item.length > 0)
    }
    const handleClick = () => {
        if (isOpened) return
        changeVisibility(field, true)
    }
    return (
        <div className={`editor_section-gray ${classes ?? ""}`} onClick={handleClick}>
            {children}
            <div className="editor_upload-icon" onClick={() => changeVisibility(field, !isOpened)}>
                {event[field as keyof EventsState] && isAllFieldFull() ?
                    <div className="icon icon-ok">✓</div>
                    : isOpened ?
                        <div className='icon icon-close'>x</div>
                        : <div className="icon">+</div>
                }
            </div>
        </div>
    )
}
