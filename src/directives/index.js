export const imgError = {
    inserted(el, {value}) {
        if (!el.src) {
            el.src = value;
        } else {
            el.onerror = function() {
                el.src = value;
            }
        }
        
    },
    update(el, {value}) {
        if(!el.src) {
            el.src = value
        }
    }
}

