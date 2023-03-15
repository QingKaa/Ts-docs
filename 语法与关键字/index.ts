// as 
// let asRoot = document.getElementById('root') // asRoot: HTMLElement | null
// let asRoot1 = document.getElementById('root') as HTMLElement // asRoot1: HTMLElement

// 定义一个常量字面量
const Colors = {
    Red: 'red',
    White: 'white'
} as const
type as1 = typeof Colors
// !
// let root1 = document.getElementById('root')! // root1: HTMLElement

// extends 关键字  继承父类方法和属性
class Animal {
    kind = 'animal'
    constructor(kind: string) {
        this.kind = kind
    }
    sayHello() {
        console.log(`Hello, I am a ${this.kind}`)
    }
}

class Dog extends Animal {
    constructor(kind: string) { super(kind) }
    bark() {
        console.log('wang wang')
    }
}

const dog = new Dog('dog')
dog.bark() // wang wang
dog.sayHello() // Hello, I am a dog


// extends 关键字  继承/拓展类型
interface Animal1 {
    kind: string
}
interface Dog1 extends Animal1 {
    bark: () => void
}
const dog1: Dog1 = { kind: 'dog', bark: () => { } }


// extends 关键字  泛型约束
function getIds<T extends { id: string | number }>(list: T[]) {
    if (!list || !list.length) return []
    return list.map(it => it.id)
}
interface TItem { id: string | number, [propName: string]: unknown }
let list: TItem[] = [{ a: 1, id: 1 }]
let ids = getIds(list)
console.log(' ====> ids', ids);


// extends 关键字 条件类型与高阶类型
type TypeName<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    T extends undefined ? undefined :
    T extends Function ? Function :
    T extends Array<any> ? T :
    object

type TN1 = TypeName<string>  // TN1 = string
type TN2 = TypeName<[]> // TN2 = any[]
type TN3 = TypeName<string[]> // TN2 = string[]
let tn3: TN3 = ['d']
let tn4: string extends TN1 ? TN1 : number = '1' // tn4: string



// keyof 和 typeof
// 访问动态类型
function getProps<T>(item: T, key: keyof T) {
    return item[key] === undefined ? '--' : item[key]
}
let res = ([] as object[]).map((item: object) => {
    return { ...item }
})
getProps({ name: 2 }, 'name') // 

// typeof 获取一个变量的类型并且能够用来声明新的变量
const Colors1 = { red: 'red', blue: 'blue' }

type Color2 = keyof typeof Colors1 // type Color2 = "red" | "blue"

function getColorProp(key: keyof typeof Colors1) {
    return Colors1[key]
}
let cRed = getColorProp('red')

//in 类型映射
type A = { age: number, id: string }
type User = {
    [K in keyof A]: string
    // c: string @errors 映射的类型可能不声明属性或方法。ts(7061) 应该使用 交叉类型 & { c: string }
} & { f: string }