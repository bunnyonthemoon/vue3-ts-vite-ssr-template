export const useMoneyMask = (value: number) => {
    const str = String(value)
    let result = ''

    for (let index = 0; index < str.length; index++) {
        result += str[index]
        if ((index + 1) % 3 == 0) result += ' '
    }

    return result
}
