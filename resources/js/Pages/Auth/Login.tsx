import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { useForm } from '@inertiajs/inertia-react';
import React, { FC, FormEventHandler } from 'react';
import {Loader2,AlertCircle} from 'lucide-react';
import ModeToggle from '@/Components/ModeToggle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

const Login:FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        company_id:"",
        password:""
    });
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        post(route('login.attempt'));
    }

    return (
        <div className='relative flex flex-col w-full items-center justify-center h-screen'>
            <ModeToggle className='absolute top-3 right-3' />                
            <Card className="max-w-md drop-shadow-sm shadow-secondary">
                <CardHeader>
                    <CardTitle>Welcome To Construction Management System</CardTitle>
                    <CardDescription>Sign In to Continue...</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id='login' onSubmit={onSubmit}>
                        <div className='my-4'>
                            {errors.company_id&&<ErrorAlert desc={errors.company_id} />}
                            {errors.password&&<ErrorAlert desc={errors.password} />}
                        </div>
                        
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="id">ID:</Label>
                                <Input disabled={processing} value={data.company_id} onChange={({target})=>setData('company_id',target.value)} id="id" placeholder="Company ID. ex:FFFF" autoComplete='off' autoCapitalize='on' required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password:</Label>
                                <Input disabled={processing} value={data.password} onChange={({target})=>setData('password',target.value)} id="password" type='password' placeholder="password" autoComplete='off' autoCapitalize='on' required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button form='login' disabled={processing} size='sm' className='text-base'>
                        Continue
                        {processing&&<Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    </Button>
                </CardFooter>
            </Card>
                
        </div>
    )
}

export default Login


const ErrorAlert:FC<{desc:string}> = ({desc}) =>{
    return(
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {desc}
            </AlertDescription>
        </Alert>
    );
}