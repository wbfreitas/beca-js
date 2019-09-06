function addBorda(el, color) {
    const nodeList = el.length ? el : [el];
    const bordColor = color ? color : 'pink';
    nodeList.forEach(e => {
        if (e.style) {
            e.style.border = '2px solid ' + bordColor;
            e.style.borderStyle = 'dashed';
        }
    });
}

(function($) {
    $.fn.addBorda = function(color) {
        addBorda([...this], color);
    };
})($);