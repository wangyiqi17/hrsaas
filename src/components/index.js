import PageTools from "@/components/PageTools"

const components = [PageTools]

export default {
    install(Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}
}