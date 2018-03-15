
const ellipsis = '…'
function truncate(htmlStr, n) {
    currPos = 0
    numChars = 0
    let tagStack = []
    while (currPos < htmlStr.length) {
        const c = htmlStr[i]
        if (c === '<') {
            let tag = readTag(htmlStr, currPos)
            if (tag.isClosing) {
                if (tagStack[tagStack.length - 1] === tag.tagname) {
                    tagStack.pop()
                }
            }
            else {
                tagStack.push(tag.tagname)
            }
            currPos = tag.newPos
        }
        else {
            let word = readWord(htmlStr, currPos)
            let len = word.newPos - currPos
            if (numChars + len >= n) {
                let cutPoint = -1
                const maxFromCurr = n - numChars
                if (maxFromCurr <= word.spaceNum) {
                    cutPoint = currPos + maxFromCurr
                } else {
                    cutPoint = currPos
                }
                htmlStr[cutPoint] = ellipsis
                return appendClosingTags(htmlStr.slice(0, cutPoint+1), tagStack)
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
            return {word, newPos, spaceNum}
        }
        word += htmlStr[newPos]
        newPos += 1
    }

    return null
}

function readSpaces(htmlStr, currPos) {
    let newPos = currPos
    while (newPos < htmlStr.length && htmlStr[newPos] === ' ') {
        newPos += 1
    }
    return {spaceNum: newPos - currPos, newPos}
}

function readTag(htmlStr, currPos) {
    const isClosing = isClosingTag(htmlStr, currPos)
    let {tagname, newPos} = readTagname(htmlStr, currPos+1+isClosing) // can be an error

    while (newPos < htmlStr.length) {
        if (htmlStr[newPos] === '>') {
           return {tagname, newPos, isClosing} 
        } //TODO: check for self-closing tag
        newPos += 1
    }
    return null;
}

function isClosingTag(htmlStr, currPos) {
    return (currPos+1 < htmlStr) 
        && (htmlStr[currPos+1] === '/')
}

function readTagname(htmlStr, currPos) {
    let tagname = ''
    let newPos = currPos
    while (newPos < htmlStr.length) {
        if (htmlStr[newPos] === ' ') {
            return { tagname, newPos }
        }
        tagname += htmlStr[newPos]
        newPos += 1
    }
}