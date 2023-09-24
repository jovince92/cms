import {FC, useMemo, useState } from 'react';
import { Picture } from '../types';
import FsLightbox from "fslightbox-react";
import GalleryItem from './GalleryItem';

interface GalleryProps{
    pictures:Picture[]
}


const Gallery:FC<GalleryProps> = ({pictures}) => {
    const [lightboxController, setLightboxController] = useState({
		toggler: false,
		slide: 1
	});

    const  openLightboxOnSlide = (slide:number) =>{
		setLightboxController({
			toggler: !lightboxController.toggler,
			slide
		});
	}

    const pictureUrls:string[] = useMemo(()=>pictures.map(({location})=>location),[pictures]);

    return (
        <>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 p-6 gap-3.5'>
                {pictures.map((pic,_idx)=> <GalleryItem toggleSlide={(slide)=>openLightboxOnSlide(slide)} slide={(_idx+1)} picture={pic} key={pic.id} />)}
            </div>
            <FsLightbox toggler={lightboxController.toggler} sources={pictureUrls} slide={lightboxController.slide} />
        </>
    )
}
        

export default Gallery