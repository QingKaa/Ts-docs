/*
 * @Description: 实用工具类型
 * @Author: zhh_e
 * @Date: 2023-03-13 16:24:41
 * @LastEditors: 清咔 874518796@qq.com
 * @LastEditTime: 2023-03-14 22:06:13
 */

// ---------------------------- Partial<T> 转换成可选属性 ---------------------------------
// 实现
type Partial1<T> = { [P in keyof T]?: T[P] }


interface Item {
    name: string;
    count: number;
    avatar: string
}

let listItem: Item = {
    name: 'item1',
    count: 1,
    avatar: 'xxxx'
}
let desItem: Partial<Item> = {
    name: 'desItem'
}

function updateItem(target: Item, item: Partial<Item>): void {
    let updateItem = { ...target, ...item }
    console.log(' ====> updateItem', updateItem);
}
updateItem(listItem, { name: 'new Item name' })


type User = {
    name: string;
    address: string;
    phone: string
}
type PartialUser = Partial<User>

// ---------------------------- Readonly<Type> 转换成只读属性  ---------------------------------
// 实现
type Readonly1<T> = { readonly [P in keyof T]: T[P] }

interface Todo { title: string }
const todo: Readonly<Todo> = { title: 'now is readonly title' }
// todo.title = 'new title' // @errors 无法为“title”赋值，因为它是只读属性。ts(2540)
declare function freeze<T>(target: T): Readonly<T>


// ---------------------------- Record<K,T> 属性映射 ---------------------------------
// 实现
type Record1<Keys extends keyof any, Type> = {
    [P in Keys]: Type
}


interface PageInfo { title: string }
type Page = 'home' | 'about' | 'contact'
const x: Record<Page, PageInfo> = {
    home: { title: 'home page' },
    about: { title: 'about page' },
    contact: { title: 'contact page' }
}


// ---------------------------- Pick<Type,Keys> 从Type中选择Keys构造类型 ---------------------------------
interface Todo1 {
    id: string | number;
    title: string;
    date: string;
    content: string;
}
const todoTitle: Pick<Todo1, 'title' | 'id'> = {
    title: 'toDoTitle1',
    id: 'xxx'
}
const todoIdList: Pick<Todo1, 'id'>[] = [
    { id: 'sss' }, { id: 2223 }
]

type IdList = Array<string | number>
const todoIds = todoIdList.reduce((ls, item) => {
    return ls.concat(item.id)
}, [] as IdList)


// ---------------------------- Omit<Type, Keys> 剔除Keys中属性 ---------------------------------

interface UserOmit {
    name: string;
    age: number;
    address: string;
    other: string
}

type UserBase = Omit<UserOmit, 'other' | 'age'>
// ===> 
// type UserBase = {
//     name: string;
//     address: string;
// }



// ---------------------------- Exclude<Type, ExcludedUnion> ---------------------------------

type Exclude1<T, U> = T extends U ? never : T;


// ---------------------------- Extract<Type, Union> ---------------------------------
// 从类型Type中提取所有可以赋值给Union的类型，然后构造一个类型。
type Extract1<T, U> = T extends U ? T : never;

type ET0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // ET0 = 'a'
type ET1 = Extract<'a' | 'b' | 'c' | 'f', 'a' | 'f'> // ET1 = 'a' | 'f'
type ET2 = Extract<{ a: string, b: string, d: string }, { a: string }>
// ET2 = { a: string, b: string, d: string }


// ---------------------------- Parameters<Type> ---------------------------------
// 由函数类型Type的参数类型来构建出一个元组类型。
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters1<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

type PR0 = Parameters<() => string> //  []
type PR1 = Parameters<(s: string) => string> // [s:string]
// let pr1: PR1 = ['1', 1] 
// @errors 不能将类型“[string, number]”分配给类型“[s: string]”。
// 源具有 2 个元素，但目标仅允许 1 个。ts(2322)
type PR2 = Parameters<<T>(arg: T) => T> // [arg: unknown]


// ---------------------------- ReturnType<Type> ---------------------------------
// 由函数类型 Type 的返回值类型构造一个新类型

type RT0 = ReturnType<() => string > // string
type RT1 = ReturnType<() => void> // void
// type RT2 = ReturnType<Function> 
// @errors  类型“Function”提供的内容与签名“(...args: any): any”不匹配。ts(2344)


// ---------------------------- Required<Type> ---------------------------------
// 构建一个类型，使类型Type的所有属性为required。 与此相反的是Partial。

interface Props { a?: number; s?:string }
type RProps = Required<Props>
// RProps = { a: number, s: string }
