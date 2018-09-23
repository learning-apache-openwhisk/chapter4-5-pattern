class Component {

    constructor(prefix, suffix = "") {
        this.prefix = prefix
        this.suffix = suffix
        this.children = []
    }

    add(child) {
        //console.log(this)
        this.children.push(child)
    }
    
    accept(visitor) {
        visitor.visit(this)
        for(let child of this.children)
            child.accept(visitor)
    }

}

module.exports = Component
