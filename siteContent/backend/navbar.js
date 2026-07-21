const navbarImport = `
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<nav class="navbar bg-light fixed-top navbar-expand-sm" style="z-index: 99;" id="navigation">
    <!-- https://icons.getbootstrap.com/icons/house/ -->
    <!-- https://getbootstrap.com/docs/4.0/components/navbar/ -->
    <div class="container-fluid"> <!-- built in padding, ensures navbar always full length of screen -->
        <span class="navbar-brand" href="#" id="seasonHandle">Summer</span>
        <div class="collapse navbar-collapse justify-content-center">
            <div class="navbar-nav">
                <a href="second.html" class="nav-item nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg> Home</a>
                <a class="nav-item nav-link" href="#">Showcase</a>
            </div>
            
        </div>
        <span class="navbar-text"><em>Site made without AI</em></span>
    </div>
    
</nav>
` //remember to use backticks for multi line strings
// span is used instead of p because of visual difference. since span is inline it does not add padding and margin. p does, which skews the lining with the middle text

// thank you legend https://community.adobe.com/questions-621/including-one-html-file-in-another-643698

document.querySelector('body').insertAdjacentHTML('afterbegin', navbarImport)