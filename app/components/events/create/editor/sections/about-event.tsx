import React, { Ref, useEffect, useRef, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { useField } from 'react-final-form';
import { useAppSelector } from '@/lib/hooks';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

export default function AboutEvent({ isOpened }: { isOpened: boolean }) {
    const eventInfo = useAppSelector((state) => state.createdEventInfo.eventInfo)
    const initialState = () => {
        if (!!eventInfo.text) {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(eventInfo.text as string) as any
                )
            )
        }
        return EditorState.createEmpty()
    }

    const [editorState, setEditorState] = useState(initialState);
    const [isInitialEditor, toogleInitialEditor] = useState(false)

    const editorRef = useRef<any>()
    const toolbar = {
        options: ['blockType', 'inline', 'textAlign', 'list', 'link', 'fontSize', 'colorPicker'],
        blockType: {
            options: ['Normal', 'H2', 'H3', 'H5', 'Blockquote']
        },
        inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline'],
        },
        list: {
            inDropdown: false,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
        textAlign: {
            className: 'editor_field_text-align',
            inDropdown: true,
            options: ['left', 'center', 'right']
        },
        link: {
            inDropdown: false,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link'],
            popupClassName: "link-modal",
        },
        fontSize: {
            options: [10, 11, 12, 14, 16, 18, 24, 30, 36],
        },
    }
    const about = useField('about')

    function createMarkup(html: any) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const onEditorChange = (editorState: any) => {
        setEditorState(editorState);
    }
    const setEditorReference = (ref: any) => {
        if (!ref) return
        editorRef.current = ref;
        if (!isInitialEditor) toogleInitialEditor(true)
    }
    useEffect(() => {
        if (!isInitialEditor) return
        if (!editorRef.current) return
        editorRef?.current.focus();
        about.input.onBlur()
    }, [isInitialEditor, isOpened])

    useEffect(() => {
        let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        if (html === "<p></p>\n") return about.input.onChange("")
        about.input.onChange(html)
    }, [editorState]);
    return (
        <div className='editor_title'>
            <div className={isOpened ? 'show' : 'hidden'}>
                {isOpened && <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={toolbar}
                    editorRef={setEditorReference}
                />}
            </div>
            <div className={isOpened ? 'hidden' : 'show'}>
                {about.input.value.length > 0 ?
                    <>
                        <h3>About this event</h3>
                        <div
                            className="preview"
                            dangerouslySetInnerHTML={createMarkup(about.input.value)}>
                        </div>
                    </>
                    :
                    <>
                        <h3>About this event</h3>
                        <p>Use this section to provide more details about your event. You can include things to know, venue information, parking, accessibility options—anything that will help people know what to expect.</p>
                    </>
                }
            </div>
        </div>
    )
}
