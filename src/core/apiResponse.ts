import { Response } from 'express';

export class ApiResponse {
    private _success: boolean;
    private _status: number;
    private _message: string;

    constructor(status = 500, message = 'Error', success = false) {
        this._success = success;
        this._status = status;
        this._message = message;
    }

    send(response: Response): Response {
        return response.status(this._status).json(this);
    }
}
