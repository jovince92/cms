<?php

namespace App\Http\Controllers;

use App\Mail\QuotationRequestEmail;
use App\Models\Quotation;
use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class QuotationRequestController extends Controller
{
    public function mail(Request $request,$project_id=null){
        $quotation = Quotation::findOrFail($request->quotation_id);
        $emails_str="";
        //dd($request);
        $emails=$request->emails;
        foreach($emails as $address){
            $emails_str=$emails_str.$address['email'].',';
            Mail::to($address['email'])
                ->send(new QuotationRequestEmail(
                    env('APP_NAME', 'CMS'),
                    env('MAIL_FROM_ADDRESS','donotreply@ddc-cms.com'),
                    $request->subject,
                    $request->body
                )
            );
        }
        if(substr($emails_str,strlen($emails_str)-1)==","){
            $emails_str=substr($emails_str, 0, -1);
        }
        RequestLog::create([
            'project_id'=>$project_id,
            'quotation_id'=>$request->quotation_id,
            'recipients'=>$emails_str,
            'subject_line'=>$request->subject,
            'body'=>$request->body
        ]);

        $quotation->update([
            'status'=> 'Awaiting Approval'
        ]);

        return Redirect::back();
    }
}
