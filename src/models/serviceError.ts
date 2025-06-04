class ServiceError extends Error {
    status: number;

    constructor(message: string, statusCd: number) {
        super(message);
        this.status = statusCd;
        this.name = 'ServiceError';

        // Gemini recommended doing this
        // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}


// Some duck typing, please forgive me 🙏😔
const isServiceError = (error: any): error is ServiceError => {
    return error.message && error.status;
}

export {
    ServiceError,
    isServiceError
}