function extend<T extends object, U extends object>(first: T, second: U): T & U {
    const result: Partial<T & U> = {}
    for (const key in first) {
        if (first.hasOwnProperty(key)) {
            (result as T)[key] = first[key]
        }
    }
    for (const key in second) {
        if (second.hasOwnProperty(key)) {
            (result as U)[key] = second[key]
        }
    }
    return result as T & U
}

class Person {
    constructor(public name: string) {

    }
}

interface Loggable {
    a: number
    log(name: string): void
    abc(name: string): void
}

class ConsoleLogger implements Loggable {
    a = 1;
    log = function (name: string): void {
        console.log('log ====> name', name);
    }
    abc(name: string): void {
        console.log('abc ====> name', name);
    }
}
const jim = extend(new Person('jim'), new ConsoleLogger())
jim.log(jim.name)

/** ----------------------------  ---------------------------------*/
// 将错误处理类型分离出来
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[]
}
interface ArtistsData {
    artists: { name: string }[]
}

type ArtworksResponse = ArtworksData & ErrorHandling
type ArtistsResponse = ArtistsData & ErrorHandling

const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
        console.log(response.error.message)
        return
    }
    console.log(' ====> response.artists', response.artists);
}
