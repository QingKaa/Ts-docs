/*
 * @Description: 
 * @Author: zhh_e
 * @Date: 2023-03-13 15:01:42
 * @LastEditors: zhh_e
 * @LastEditTime: 2023-03-13 16:00:52
 */

/** ---------------------------- 简单联合类型（基础类型之间联合） ---------------------------------*/
type Description = string | number
let des: Description = 1
des = '2'

/** ---------------------------- 具有公共字段的联合 ---------------------------------*/
interface Bird {
    fly(): void
    layEggs(): void
}

interface Fish {
    swim(): void
    layEggs(): void
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs()
// pet.swim() // @errors: 2339; 类型“Fish | Bird”上不存在属性“swim”。类型“Bird”上不存在属性“swim”。

/** ---------------------------- 可区分联合 ---------------------------------*/
type NetworkLoadingState = { state: 'loading' }
type NetworkFailedState = { state: 'failed'; code: number }
type NetworkSuccessState = {
    state: 'success'
    response: {
        title: string
        content: string
        author: string
    }
}

type NetworkFromCachedState = {
    state: 'fromCache'
}
type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState

function assertNever(x: never): never {
    throw new Error('Unexpected object' + x)
}

function logger(res: NetworkState) {
    // 可以正确访问联合类型中公共的成员
    const { state } = res
    switch (state) {
        case "loading":
            // 这里 res 类型是 NetworkLoadingState
            return 'loading'
        case "failed":
            // 这里 res 类型是 NetworkFailedState 
            return `request failed ${res.code}!!!`
        case "success":
            // 这里 res 类型是 NetworkSuccessState
            console.log(' ====> res', res);
            return `request is success !!!`
        default:
            //假如 type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState | NetworkFromCachedState
            //这里将会报错（联合的穷尽性检查）
            return assertNever(res)
    }
}

/** ---------------------------- 联合的穷尽性检查 ---------------------------------*/

// type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState | NetworkFromCachedState