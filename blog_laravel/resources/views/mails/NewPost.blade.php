<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Post Created</title>
</head>
<body>
    <h3>New Post Created by {{ $post->user->name }}</h3>
    <p>Post Heading is: {{ $post->heading }}</p>
    <img src="{{ $image }}" alt="Post Image" width="300">

    <p>Get pdf file: <a href="{{$pdf}}">Click here to download</a></p>
</body>
</html>
