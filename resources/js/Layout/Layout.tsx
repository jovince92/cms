import ModeToggle from '@/Components/ModeToggle';
import { SideBarItems } from '@/Components/SidebarItems';
import { Button } from '@/Components/ui/button';
import { FC, ReactNode } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/Components/ui/separator';
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
        <div className={cn('w-full h-screen max-h-screen relative',className)}>
            
            <aside className='w-14 md:w-44 h-full fixed left-0 inset-y-0 z-50 bg-background'>
                <div className="space-y-4 py-4 h-full">
                    <div className="px-1.5 md:px-3 py-2 flex flex-col justify-between h-full">
                        <div className='flex flex-col gap-y-3.5 h-full '>
                            <h2 className="hidden md:block mb-2 px-4 text-lg font-semibold tracking-tight">
                                <p className='text-center'> Welcome to</p>
                                <p className='text-center'>CMS</p>                                
                            </h2>
                            <div className="flex-1 flex flex-col items-center  space-y-1.5 overflow-y-auto">
                                {SideBarItems.map(({icon:Icon,label,routeName})=>(
                                    <Link className='w-full flex items-center justify-center' href={route(routeName)} key={routeName} >
                                        <Button  variant={route().current()===routeName?'secondary':'ghost'} className="p-0 md:p-2 w-full flex justify-center md:justify-start  items-center">
                                            <Icon className='h-7 md:h-4 w-7 md:w-4 mr-0 md:mr-2' />
                                            <span className='hidden md:inline'>{label}</span>
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                            <Button onClick={onLogout} variant='ghost' className="mt-auto p-0 md:p-2 w-full flex justify-center md:justify-start  items-center">
                                <LogOut className='h-7 md:h-4 w-7 md:w-4 mr-0 md:mr-2' />
                                <span className='hidden md:inline'>Sign Out</span>
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </aside>
            <nav className='drop-shadow-md shadow-primary pl-16 md:pl-48 z-40 fixed top-0 inset-x-0 flex items-center justify-between text-3xl h-[3.7rem] bg-muted border-b border-secondary px-3.5 '>
                <p>{label}</p>
                <ModeToggle className='my-2' />
            </nav>
            <main className='pl-14 md:pl-44 relative bg-muted flex-1 flex flex-col h-full'>
                <div className='w-full h-full px-3.5 pt-16 bg-primary-foreground'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
                