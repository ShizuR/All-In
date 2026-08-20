// this code can run without docker
// used to customize the map

// since the svg separates england into smaller areas, group them into the england class and treat them as one entity
document.querySelectorAll('.england').forEach(function(e) {
    e.addEventListener('mouseover', e => {
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: green');
        })
    })

    e.addEventListener('mouseout', e => {
        document.querySelectorAll('.england').forEach(function(f){
            f.setAttribute('style', 'fill: goldenrod');
        })
    })
});

document.body.classList.add("disableScroll")