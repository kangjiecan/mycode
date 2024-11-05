class User {
    constructor(id, email, password, firstName, lastName, createdAt = new Date()) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    toSafeObject() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt
        };
    }
}

module.exports = User;