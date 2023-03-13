/*
 * @Description: 实用工具类型
 * @Author: zhh_e
 * @Date: 2023-03-13 16:24:41
 * @LastEditors: zhh_e
 * @LastEditTime: 2023-03-13 17:59:54
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