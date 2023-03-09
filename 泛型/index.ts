/*
 * @Description: 
 * @Author: zhh_e
 * @Date: 2023-03-09 15:15:31
 * @LastEditors: zhh_e
 * @LastEditTime: 2023-03-09 16:40:13
 */
/** ---------------------------- 泛型变量 ---------------------------------*/
// T 是类型参数
function identity<T>(arg: T): T {
    return arg
}

// 类型推论
let str = identity('string')
// 显式指定类型
let number = identity<number>(3)


/** ---------------------------- 泛型约束 ---------------------------------*/
// 定义一个接口来描述约束条件
interface Lengthwise { length: number }
function loggingIdentity<T extends Lengthwise>(arg: T) {
    return arg
}

loggingIdentity({ length: 1, a: 2 })
// loggingIdentity({ a: '1' }) 错误


/** ---------------------------- 泛型约束中使用类型参数 ---------------------------------*/
// 声明一个类型参数，且被另一个类型参数约束
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
let propertyObj = { x: 1, y: 'y' }
let xValue = getProperty(propertyObj, 'y')