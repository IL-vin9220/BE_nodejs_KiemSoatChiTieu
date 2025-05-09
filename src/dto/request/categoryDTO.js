class Category{
    constructor({parent, code, name, description}){
        this.parent = parent;
        this.code = code;
        this.name = name;
        this.description = description;
    }
}

module.exports = Category;