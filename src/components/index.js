import PageTools from '@/components/PageTools'
import MyTest from '@/components/MyTest'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import Radar from '@/components/Radar'
import FullScreen from "@/components/FullScreen"
import ToggleLang from "@/components/ToggleLang"
const components = [PageTools, MyTest, UploadExcel, UploadImg,Calendar,Radar,FullScreen,ToggleLang]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
