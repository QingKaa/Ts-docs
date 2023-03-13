<!--
 * @Description: 
 * @Author: zhh_e
 * @Date: 2023-03-13 16:20:20
 * @LastEditors: zhh_e
 * @LastEditTime: 2023-03-13 17:55:50
-->
# 实用工具类型  

> TypeScript 提供了一些**全局**的**工具类型**来帮助常见的类型转换。

## Partial<T>, TypeScript 2.1   

> 构造类型Type，将其所有属性转换成可选的。返回类型表示输入类型的所有子类   

**实现**    
```ts
type Partial<T> = {
    [P in T]?: T[P]
}
```
**示例**
```ts
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
```   

## Readonly<Type>  

> 构造类型Type，将所有属性设置成 readonly   

**实现**
```ts
type Readonly<T> = { Readonly [P in T]: T[P]}
```

**示例**
```ts
interface Todo { title: string }
const todo: Readonly<Todo> = { title: 'now is readonly title' }
// todo.title = 'new title' // @errors 无法为“title”赋值，因为它是只读属性。ts(2540)
```

```ts
declare function freeze<T>(target: T): Readonly<T>
```


## Record<Keys, Type>

> 构造一个类型，其属性名的类型为K，属性值的类型为T。可用于将某个类型的属性映射到另一个类型上。   
**实现**
```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

**示例**
```ts
interface PageInfo { title: string }
type Page = 'home' | 'about' | 'contact'
const x: Record<Page, PageInfo> = {
    home: { title: 'home page' },
    about: { title: 'about page' },
    contact: { title: 'contact page' }
}
```

## Pick<Type, Keys>   

> 从 `Type`类型中挑选`Keys`中的属性来构造

**实现**
```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

**示例**
```ts
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
```


## Omit<Type,Keys>
> 从类型 `Type` 中获取所有属性，然后从中剔除`Keys`属性后构造一个类型。

**实现**
```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

**示例**
```ts 
interface UserOmit {
    name: string;
    age: number;
    address: string;
    other: string
}

type UserBase = Omit<UserOmit, 'other' | 'age'>
// ===> 相当于
// type UserBase = {
//     name: string;
//     address: string;
// }
```


## Exclude<Type, ExcludedUnion>

> 从类型`Type`中剔除所有可以赋值给 `ExcludedUnion`的属性，然后构造一个类型   
**实现**   
```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

**示例**   
