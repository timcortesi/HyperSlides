@extends('default.default')

@section('title', 'Home')

@section('content')
<div class="row">
    <div class="col-sm-12" style="text-align:center;">
        <center><h1 style="text-align:center;">Welcome to HyperSlides!</h1></center>
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <a href="/deck" target="_blank" class="btn btn-primary">Create a New HyperSlide Deck</a>
            </div>
        </div>
    </div>
</div>
@endsection