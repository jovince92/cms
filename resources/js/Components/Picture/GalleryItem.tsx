import {FC, MouseEventHandler} from 'react'
import { Picture } from '../types'
import { Button } from '../ui/button';
import ActionTooltip from '../ActionTooltip';
import { Trash2 } from 'lucide-react';
import { useImageModal } from '@/Hooks/useImageModal';

interface GalleryItemProps{
    picture:Picture;
    toggleSlide:(slide:number)=>void;
    slide:number;
}

const GalleryItem:FC<GalleryItemProps> = ({picture,toggleSlide,slide}) => {
    const {onOpen} = useImageModal();
    const handleDelete:MouseEventHandler<HTMLButtonElement> = (e) =>{
        e.stopPropagation();
        onOpen('DeleteImage',{picture});
    }

    return (
        <div onClick={()=>toggleSlide(slide)} className='cursor-pointer hover:opacity-70 transition relative flex items-center justify-center aspect-square  group border-2 rounded-md '>
            <img src={picture.location} className='object-cover w-40 h-40' />
            <ActionTooltip label='Delete'>
                <Button onClick={handleDelete} className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300' size='icon' variant='destructive'>
                    <Trash2 className='h-6 w-6' />
                </Button>
            </ActionTooltip>
        </div>
    )
}

export default GalleryItem