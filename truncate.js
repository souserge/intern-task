
function truncate(htmlStr, n) {
    const ellipsis = '…'


}

function walkHtml(htmlStr, n) {
    currPos = 0;
    numChars = 0;
    while (currPos < htmlStr.length) {
        const c = htmlStr[i]
        if (c == '<') {
            let tag = readTag(htmlStr, currPos)
        }
        else {
            // readWord();
        }

        currPos++
    }
}

function readTag(htmlStr, currPos) {
    const isClosing = isClosingTag(htmlStr, currPos)
    let tagname
    ({tagname, currPos} = readTagname(htmlStr, currPos+1+isClosing)) // can be an error

    while (currPos < htmlStr.length) {
        if (htmlStr[currPos] === '>') {
           return {tagname, currPos, isClosing} 
        } //TODO: check for self-closing tag
        currPos += 1
    }
}

function isClosingTag(htmlStr, currPos) {
    return (currPos+1 < htmlStr) 
        && (htmlStr[currPos+1] === '/')
}

function readTagname(htmlStr, currPos) {
    let tagname = ''
    while (currPos < htmlStr.length) {
        if (htmlStr[currPos] === ' ') {
            return { tagname, currPos }
        }
        tagname += htmlStr[currPos]
        currPos += 1
    }
}