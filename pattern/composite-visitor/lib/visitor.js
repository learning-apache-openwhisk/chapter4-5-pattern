class Visitor {
    
    constructor() {
        this.prefixes = []
        this.suffixes = []
    }

    visit(item) {
        this.prefixes.push(item.prefix)
        this.suffixes.push(item.suffix)
    }

    render() {
        return this.prefixes.join("") +
               this.suffixes.reverse().join("")
    }

}

module.exports = Visitor