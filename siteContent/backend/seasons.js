const Import = `
<head>
    <meta charset="UTF-8">
    <link href="../cssFiles/seasonCSS.css" rel="stylesheet">
</head>

<img src="../artRes/sun.png" class="bgSeason" id="sun">
`

document.querySelector('body').insertAdjacentHTML('afterbegin', Import)