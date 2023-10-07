import  { FC, useEffect } from 'react'
import { Editor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';



interface Props{
    content:string;
    editor:Editor;
}

const TipTap:FC<Props> = ({content,editor}) => {
    
    useEffect(()=>{
        if(content){
            editor.commands.setContent(content);
        }
    },[content,editor]);
    
    return (
        <div className='flex flex-col space-y-1'>
            <MenuBar editor={editor} />
            <EditorContent editor={editor}   />
        </div>

    );
}

export default TipTap