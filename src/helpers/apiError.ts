export class ApiError extends Error {
    private _status: number;

    constructor(status?: number, message?: string) {
        super(message || 'Error');
        this._status = status || 500;
    }

    get status(): number {
        return this._status;
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}
