import React, { FC } from 'react';
import { Phase } from '../types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import PhaseAccordionContent from './PhaseAccordionContent';

interface PhaseAccordionProps{
    phases:Phase[]
}



const PhaseAccordion:FC<PhaseAccordionProps> = ({phases}) => {

    if(phases.length<1){
        return (
            <p className='text-3xl font-bold text-center w-full my-2.5'>No Phases in this Project</p>
        )
    }
    return (
        <Accordion type="single" defaultValue={phases[0].id.toString()} collapsible className="w-full">
            {
                phases.map(phase=>(
                    <AccordionItem key={phase.id} value={phase.id.toString()}>
                        <AccordionTrigger  className='!py-2.5 !my-1.5 bg-muted border border-secondary rounded-md px-2 data-[state=open]:bg-background transition'>
                            {phase.name}
                        </AccordionTrigger>
                        <AccordionContent className='pl-6'>
                            <PhaseAccordionContent phase={phase} />
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
            
        </Accordion>
    )
}

export default PhaseAccordion