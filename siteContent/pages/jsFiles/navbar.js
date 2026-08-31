const navbarImport = `
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<nav class="navbar fixed-top navbar-expand-sm" style="z-index: 99; background-color: aliceblue;" id="navigation">
    <!-- https://icons.getbootstrap.com/icons/house/ -->
    <!-- https://getbootstrap.com/docs/4.0/components/navbar/ -->
    <div class="container-fluid" style="background-color: 1em 1em 0em rgba(50, 120, 136, 0.699);"> <!-- built in padding, ensures navbar always full length of screen -->
        <span class="navbar-brand" href="#" style="color: rgb(18, 84, 150)">All-In</span>
        <span class="navbar-text" style="color: rgb(18, 84, 150)"><em>Portfolio Website</em></span>
    </div>
    
</nav>
`
// span is used instead of p because of visual difference. since span is inline it does not add padding and margin. p does, which skews the lining with the middle text

document.querySelector('body').insertAdjacentHTML('afterbegin', navbarImport)