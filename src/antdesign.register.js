// UI 框架
import Vue from "vue";
import { Button, Select, Spin, Icon, Form, Message } from "ant-design-vue";
[Button, Select, Spin, Icon, Form, Message].forEach(comp => Vue.use(comp));
Vue.prototype.$form = Form;
Vue.prototype.$message = Message;
