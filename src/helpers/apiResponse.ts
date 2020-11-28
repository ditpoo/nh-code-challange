import { Response } from 'express';

export class ApiResponse<T> {
    private success: boolean;
    private status: number;
    private message: string;
    private data: T;

    constructor(status = 500, message = 'Error', success = false, data: T) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    send(response: Response): Response {
        return response.status(this.status).json(this);
    }
}
