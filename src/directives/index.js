export const imgError = {
    inserted:function(el, {value}) {
        el.onerror = function() {
            el.src = value;
        }
    }
}
// export const aa = {
//     inserted() {}
// }
// export const bb = {
//     inserted() {}
// }