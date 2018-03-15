document.getElementById("truncate").addEventListener('click', () => {
    const htmlStr = document.getElementById("htmlStr").value
    const n = parseInt(document.getElementById("numChars").value)
    const truncatedHtmlStr = truncate(htmlStr, n)
    document.getElementById("truncatedHtmlStr").value = truncatedHtmlStr
    document.getElementById("result").innerHTML = truncatedHtmlStr
})


const ellipsis = '…'
function truncate(htmlStr, n) {
    let currPos = 0
    let numChars = 0
    const tagStack = []
    while (currPos < htmlStr.length) {
        const c = htmlStr[currPos]
        if (c === '<') {
            const tag = readTag(htmlStr, currPos)
            if (tag.isClosing) {
                if (tagStack[tagStack.length - 1] === tag.tagname) {
                    tagStack.pop()
                }
            }
            else {
                tagStack.push(tag.tagname)
            }
            currPos = tag.newPos + 1
        }
        else {
            const word = readWord(htmlStr, currPos)
            const len = word.newPos - currPos
            if (numChars + len >= n) {
                return appendClosingTags(htmlStr.slice(0, currPos) + ellipsis, tagStack)
            } else {
                currPos = word.newPos
                numChars += len
            }
        }
    }
    return htmlStr
}

function appendClosingTags(htmlStr, tagStack) {
    while (tagStack.length > 0) {
        htmlStr += '</' + tagStack.pop() + '>'
    }
    return htmlStr
}

function readWord(htmlStr, currPos) {
    let word = ''
    let {spaceNum, newPos} = readSpaces(htmlStr, currPos)
    while (newPos < htmlStr.length) {
        if (htmlStr[newPos] === ' ' || htmlStr[newPos] === '<') {
            break
        }
        word += htmlStr[newPos]
        newPos += 1
    }
    return {word, newPos, spaceNum}
}

function readSpaces(htmlStr, currPos) {
    let newPos = currPos
    while (newPos < htmlStr.length && htmlStr[newPos] === ' ') {
        newPos += 1
    }
    return {spaceNum: newPos - currPos, newPos}
}

function readTag(htmlStr, currPos) {
    let isClosing = isClosingTag(htmlStr, currPos)
    let {tagname, newPos} = readTagname(htmlStr, currPos+1+isClosing)

    while (newPos < htmlStr.length) {
        if (htmlStr[newPos] === '>') {
            if (htmlStr[newPos-1] === '/') { // self-closing tag
                isClosing = true
            }
            break
        }
        newPos += 1
    }
    return {tagname, newPos, isClosing}
}

function isClosingTag(htmlStr, currPos) {
    return (currPos+1 < htmlStr.length) && (htmlStr[currPos+1] === '/')
}

function readTagname(htmlStr, currPos) {
    let tagname = ''
    let newPos = currPos
    while (newPos < htmlStr.length) {
        const c = htmlStr[newPos]
        if (c === ' ' || c === '/' || c === '>') {
            break
        }
        tagname += htmlStr[newPos]
        newPos += 1
    }
    return { tagname, newPos }
}