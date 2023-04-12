@extends('default.default')

@section('title', 'WAYF')

@section('content')
<div class="row">
<center><h1 style="text-align:center;">Welcome to HyperSlides!</h1></center>
<center><h3 style="text-align:center;">To Log In, Please Select Your Identity Provider From The List Below:</h1></center>
    <div class="col-sm-4 col-sm-offset-4">
        <ul class="list-group"> 
            <a href="/idp/google/@if(isset(request()->redirect))?redirect={{request()->redirect}}@endif" class="list-group-item"><i style="margin-top: 4px;" class="fa fa-lock fa-lg fa-fw pull-right"></i><i class="fab fa-google fa-lg fa-fw"></i>&nbsp;Google Login</a>
        </ul>
    </div>
</div>
<div class="row">
    <div class="col-sm-8 col-sm-offset-2">
      <div class="alert alert-info">
        <p>
            HyperSlides is a simple web application development tool which is a cross between HyperCard and Google Slides.
        </p>
        <p style="margin-top:20px;">
            For more information about the HyperSlides, 
            please contact 
            <a href="mailto:tcortesi@gmail.com">tcortesi@gmail.com</a>.
        </p>
      </div>
    </div>
</div>
@endsection