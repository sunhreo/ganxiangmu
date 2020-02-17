// 导入默认校验规则
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// rules: {alpha:xx,alpha_dash:xx,alpha_num:xx……}
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
