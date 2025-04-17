<!DOCTYPE html>
<html>
<head>
    <title>{{ $heading }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            position: relative;
        }
        h1 {
            text-align: center;
            font-size: 28px;
            margin-bottom: 10px;
        }
        h4 {
            text-align: left;
            font-style: italic;
            margin-top: 0;
        }
        .description {
            text-align: justify;
            margin: 40px auto;
            width: 90%;
        }
        .author {
            position: absolute;
            bottom: 20px;
            right: 40px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>{{ $heading }}</h1>
    <h4>{{ $slug }}</h4>

    <div class="description">
        {!! nl2br(e($description)) !!}
    </div>

    <div class="author">
        Author: {{ $author }}
    </div>
</body>
</html>
