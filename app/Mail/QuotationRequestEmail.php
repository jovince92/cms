<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class QuotationRequestEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public string $name;
    public string $subject;
    public string $email;
    public string $body;
    public function __construct($name,$email,$subject,$body)
    {
        $this->name=$name;
        $this->email=$email;
        $this->body =$body;
        $this->subject =$subject;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->subject)->view('emails.mail_request');
    }
}
