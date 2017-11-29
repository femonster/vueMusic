export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(" ")
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function hasClass(el, className) {
    // 匹配 "className" 或者 " className "
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}