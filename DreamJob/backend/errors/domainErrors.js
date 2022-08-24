class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ConflictError extends DomainError {
    constructor(message, id) {
        super(message);
        this.id = id;
    }
}

module.exports={
    ConflictError
}