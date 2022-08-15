import PageTools from "@/components/PageTools"
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
const components = [PageTools,UploadExcel,UploadImg]

export default {
    install(Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}
}