import ModeToggle from '@/Components/ModeToggle';
import { SideBarItems } from '@/Components/SidebarItems';
import { Button } from '@/Components/ui/button';
import { FC, FormEventHandler, ReactNode, useEffect, useState } from 'react'
import { Link, useForm } from '@inertiajs/inertia-react';
import { LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/Components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { AlertDialogHeader } from '@/Components/ui/alert-dialog';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { toast } from 'react-toastify';
interface Props{
    children:ReactNode;
    className?:string;
    label:string;
}


const Layout:FC<Props> = ({children,className,label}) => {
    const { post } = useForm();
    const [open,setOpen] = useState(false);
    const onLogout = () =>{
        post(route('logout'));
    }
    return (
        <>
            <div className={cn('w-full h-screen max-h-screen relative ',className)}>
                
                <aside className='w-14 md:w-44 h-full fixed left-0 inset-y-0 z-50 bg-background border-r border-r-secondary'>
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
                <nav className='drop-shadow-md shadow-primary pl-16 md:pl-48 z-40 fixed top-0 inset-x-0 flex items-center justify-between  h-[3.7rem] bg-background border-b border-secondary px-3.5 '>
                    <p className='tracking-tight font-bold text-3xl'>{label}</p>
                    <div className='flex items-center justify-center gap-x-2'>                    
                        <ModeToggle className='my-2' />
                        <Button onClick={()=>setOpen(true)} variant='outline' className='aspect-square !p-0'>
                            <Settings />
                        </Button>
                    </div>
                </nav>
                <main className='pl-14 md:pl-44 relative bg-muted flex-1 flex flex-col h-full'>
                    <div className='w-full h-full px-3.5 pt-16 pb-2.5 bg-primary-foreground'>
                        {children}
                    </div>
                </main>
            </div>
            <ChangePasswordModal isOpen={open} onClose={()=>setOpen(false)} />
        </>
    )
}

export default Layout


interface ChangePasswordModalProps{
    isOpen?:boolean;
    onClose:()=>void;
}

const ChangePasswordModal:FC<ChangePasswordModalProps> = ({onClose,isOpen}) =>{

    const {processing,errors,data,setData,reset,post} = useForm({
        current_password:"",
        password:"",
        password_confirmation:"",
    });


    useEffect(()=>{
        if (!isOpen) reset();
    },[isOpen]);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('accounts.change_password'),{
            onSuccess:()=>{
                toast.success('Password Changed');
                onClose();
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col space-y-2.5'>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor='name'>Old Password</Label>
                        <Input autoComplete='off' autoFocus required disabled={processing} id='name' value={data.current_password} onChange={({target})=>setData('current_password',target.value)} />
                        {errors.current_password&& <p className='text-destructive text-xs'>{errors.current_password}</p>}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor='name'>New Password</Label>
                        <Input autoComplete='off' required disabled={processing} id='name' value={data.password} onChange={({target})=>setData('password',target.value)} />
                        {errors.password&& <p className='text-destructive text-xs'>{errors.password}</p>}
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor='name'>Confirm New Password</Label>
                        <Input autoComplete='off' required disabled={processing} id='name' value={data.password_confirmation} onChange={({target})=>setData('password_confirmation',target.value)} />
                        {errors.password_confirmation&& <p className='text-destructive text-xs'>{errors.password_confirmation}</p>}
                    </div>
                    <Button disabled={processing} className='ml-auto font-semibold text-base' size='sm' variant='outline'>
                        Change Password
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
                