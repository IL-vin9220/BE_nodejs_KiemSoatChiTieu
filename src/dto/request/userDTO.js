class User {
    constructor({
        id = null,
        name = '',
        username = '',
        password = '',
        email = '',
        sdt = '',
        avatar = '',
        status = 'ACTIVE',
        createdAt = new Date(),
        updatedAt = null,
        deletedAt = null
    } = {}) {

        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.sdt = sdt;
        this.avatar = avatar;
        this.status = status;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

export default User;