class User {
    constructor({
        name = '',
        username = '',
        pass = '',
        email = '',
        avatar = '',
        createDate = new Date(),
        status = 'active',
        index = 0
    } = {}) { // ← thêm `= {}` để khi không truyền gì vẫn không lỗi
        this.name = name;
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.avatar = avatar;
        this.createDate = createDate;
        this.status = status;
        this.index = index;
    }
}

export default User;