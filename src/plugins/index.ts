/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Input,
  Form,
  Select,
  Checkbox,
  Dropdown,
  Avatar,
  Carousel,
  Upload,
  Modal,
  Space,
  Switch,
  Menu,
  Spin,
  Tabs,
  Tooltip,
  InputNumber,
  Row,
  Col,
  Image,
  Typography
} from 'ant-design-vue'

import FormatBalance from '@/components/format/FormatBalance'
import ShortenAddress from '@/components/shorten-address.vue'
import TokenImage from '@/components/image/token-image'

const Ant = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install(Vue: any) {
    Vue.component(Menu.SubMenu.name, Menu.SubMenu)
    Vue.component(Modal.name, Modal)
    Vue.component(Tabs.name, Tabs)
    Vue.component(Tabs.TabPane.name, Tabs.TabPane)
    Vue.component(Tooltip.name, Tooltip)
    Vue.component(Spin.name, Spin)
    Vue.component(InputNumber.name, InputNumber)
    Vue.component(Switch.name, Switch)
    Vue.component(Button.name, Button)
    Vue.component(Carousel.name, Carousel)
    Vue.component(Avatar.name, Avatar)
    Vue.component(Input.name, Input)
    Vue.component(Form.name, Form)
    Vue.component(Select.name, Select)
    Vue.component(Upload.name, Upload)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Dropdown.name, Dropdown)
    Vue.component(Space.name, Space)
    Vue.component(Menu.name, Menu)
    Vue.component(Menu.Item.name, Menu.Item)
    Vue.component(Row.name, Row)
    Vue.component(Col.name, Col)
    Vue.component(Image.name, Image)
    Vue.component(Typography.name, Typography)
    Vue.component(Typography.Paragraph.name, Typography.Paragraph)
    Vue.component(Typography.Text.name, Typography.Text)

    // custom
    Vue.component(FormatBalance.name, FormatBalance)
    Vue.component(TokenImage.name, TokenImage)
    Vue.component(ShortenAddress.name, ShortenAddress)
  }
}
export default Ant
