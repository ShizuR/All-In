// this code can run without docker
// used to customize the map

// since the svg separates england into smaller areas, group them into the england class and treat them as one entity
document.querySelectorAll('.england').forEach(function(e) {
    e.addEventListener('mouseover', e => {
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: rgb(69, 162, 205)');
        })
    })

    e.addEventListener('mouseout', e => {
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: rgb(100, 191, 233)');
        })
    })
});

document.body.classList.add("disableScroll")