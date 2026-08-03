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
        <span class="navbar-text"><em>Site made without AI</em></span>
    </div>
    
</nav>
` //remember to use backticks for multi line strings
// span is used instead of p because of visual difference. since span is inline it does not add padding and margin. p does, which skews the lining with the middle text

// thank you legend https://community.adobe.com/questions-621/including-one-html-file-in-another-643698

document.querySelector('body').insertAdjacentHTML('afterbegin', navbarImport)