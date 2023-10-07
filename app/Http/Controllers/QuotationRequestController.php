<?php

namespace App\Http\Controllers;

use App\Mail\QuotationRequestEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class QuotationRequestController extends Controller
{
    public function __invoke(Request $request){
        $emails=$request->emails;
        foreach($emails as $email){
            Mail::to($email)
                ->send(new QuotationRequestEmail(
                    env('APP_NAME', 'CMS'),
                    env('MAIL_FROM_ADDRESS','donotreply@ddc-cms.com'),
                    $request->subject,
                    $request->body
                )
            );
        }
        return Redirect::back();
    }
}
