import React, {useEffect, useState} from 'react';
import { EditorState,convertToRaw,ContentState,convertFromHTML  } from "draft-js";
import { Editor as EditorDraft } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import {Files} from "../../api/Endpoints/Files";
import htmlToDraft from 'html-to-draftjs';

const Editor = (props) => {
    const [value_, setValue]= useState();
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(
            ContentState.createFromBlockArray(
                htmlToDraft(props.val? props.val : "<p> </p>").contentBlocks
            )
        ),
    );

    const uploadImageCallBack = async (file) => {

        const data = new FormData();
        data.append("file", file)
        let response = await Files.store(data);
        console.log("uploadImageCallBack", response.data.data.file)
        return  { data: { link: response.data.data.file } };
    }


    useEffect(()=>{
        console.log("val",props.val)
        setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
                htmlToDraft(props.val? props.val : "<p> </p>").contentBlocks
            )
        ))
    },[typeof props.val])

    return (
        <EditorDraft
            editorState={editorState}
            onEditorStateChange={e=>{
                setEditorState(e)
                console.log("getCurrentContent:",draftToHtml(convertToRaw(e.getCurrentContent())))
                props.onValueChange(draftToHtml(convertToRaw(e.getCurrentContent())));
            }}
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: false, mandatory: false },
                    previewImage: true,
                    defaultSize: {
                        height: '300px',
                        width: 'auto',
                    },
                },
            }}
        />
    );
};

export default Editor;
