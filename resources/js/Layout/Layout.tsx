import ModeToggle from '@/Components/ModeToggle';
import { SideBarItems } from '@/Components/SidebarItems';
import { Button } from '@/Components/ui/button';
import { FC, ReactNode } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
interface Props{
    children:ReactNode;
    className?:string;
    label:string;
}


const Layout:FC<Props> = ({children,className,label}) => {
    const { post } = useForm();
    
    const onLogout = () =>{
        post('logout');
    }
    return (
        <div className={cn('w-full h-screen relative flex',className)}>
            <ModeToggle className='absolute top-2 right-2' /> 
            <aside className='w-14 md:w-44 h-full'>
            
                <div className="space-y-4 py-4 h-full">
                    <div className="px-1.5 md:px-3 py-2 flex flex-col justify-between h-full">
                        <div>
                            <h2 className="hidden md:block mb-2 px-4 text-lg font-semibold tracking-tight">
                                Welcome to CMS
                            </h2>
                            <div className="flex flex-col items-center justify-center space-y-1.5">
                                {SideBarItems.map(({icon:Icon,label,routeName})=>(
                                    <Link className='w-full flex items-center justify-center' href={route(routeName)} key={routeName} >
                                        <Button  variant={route().current()===routeName?'secondary':'ghost'} className="p-0 md:p-2 w-full flex justify-center md:justify-start  items-center">
                                            <Icon className='h-7 md:h-4 w-7 md:w-4 mr-0 md:mr-2' />
                                            <span className='hidden md:inline'>{label}</span>
                                        </Button>
                                    </Link>
                                ))}

                                

                            </div>
                        </div>
                        <Button onClick={onLogout} variant='ghost' className="mt-auto p-0 md:p-2 w-full flex justify-center md:justify-start  items-center">
                            <LogOut className='h-7 md:h-4 w-7 md:w-4 mr-0 md:mr-2' />
                            <span className='hidden md:inline'>Sign Out</span>
                        </Button>
                    </div>
                </div>
                
            </aside>
            <main className='bg-muted flex-1 flex flex-col h-full'>
                <div className=' top-0 w-full flex items-center text-3xl h-[3.7rem] bg-primary-foreground border-b border-secondary px-3.5 mb-6'>
                    <p>{label}</p>
                </div>
                <div className='flex-1 px-3.5'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout