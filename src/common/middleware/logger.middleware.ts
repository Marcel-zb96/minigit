/* eslint-disable prettier/prettier */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: Logger) { }

    use(req: Request, res: Response, next: NextFunction) {
        this.logRequest(req);
        this.logResponse(res);
        next();
    }

    private logRequest(request: Request): void {
        setTimeout(() => {
            this.logger.log(`Request incoming - [${request.method}] - @ ${request.url}`);

            const reqHeadersToLog = { ...request.headers };
            delete reqHeadersToLog.authorization;
            delete reqHeadersToLog.cookie;

            this.logger.log(`Request headers: \n${JSON.stringify(reqHeadersToLog, null, 2).replace(/^/gm, '\t\t')}}\n`);
            if (this.hasRequestBody(request)) {
                this.logger.log(`Request body: \n${JSON.stringify(request.body, null, 2).replace(/^/gm, '\t\t')}`);
            }
        }, 0);
    }

    private hasRequestBody(request: Request): boolean {
        if (!request.body || typeof request.body !== 'object') {
            return false;
        }
        return Object.keys(request.body as Record<string, unknown>).length > 0;
    }

    private logResponse(res: Response): void {
        const rawResponse = res.write;
        const rawResponseEnd = res.end;
        const chunkBuffers: any = [];

        res.write = (...chunks: any[]) => {
            const resArgs: any[] = [];
            for (let i = 0; i < chunks.length; i++) {
                resArgs[i] = chunks[i];
                if (!resArgs[i]) {
                    res.once('drain', res.write);
                    i--;
                }
            }
            if (resArgs[0]) {
                chunkBuffers.push(Buffer.from(resArgs[0]));
            }
            return rawResponse.apply(res, resArgs);
        };

        res.end = (...chunk) => {
            const resArgs: any[] = [];
            for (let i = 0; i < chunk.length; i++) {
                resArgs[i] = chunk[i];
            } 
            if (resArgs[0]) {
                chunkBuffers.push(Buffer.from(resArgs[0]));
            } 
            const body = Buffer.concat(chunkBuffers).toString('utf8'); 
            res.setHeader('origin', 'restjs-req-res-logging-repo'); 
            const responseLog = {
                response: {
                    statusCode: res.statusCode,
                    body: JSON.parse(body) || body || {},
                    headers: res.getHeaders(),
                },
            }; 
            const logLevel: string = this.getLogLevel(responseLog.response.statusCode);

            this.logger[logLevel](`Response status - [${responseLog.response.statusCode}]`);
            this.logger[logLevel](`Response headers: \n${JSON.stringify(responseLog.response.headers, null, 2).replace(/^/gm, '\t\t')}}\n`);
            if (this.hasResponseBody(responseLog.response)) {
                this.logger[logLevel](`Response body: \n${JSON.stringify(responseLog.response.body, null, 2).replace(/^/gm, '\t\t')}`);
            }

            rawResponseEnd.apply(res, resArgs);
            return responseLog as unknown as Response;
        };
    }

    private hasResponseBody(response: any): boolean {
        if (!response.body || typeof response.body !== 'object') {
            return false;
        }
        return Object.keys(response.body as Record<string, unknown>).length > 0;
    }

    private getLogLevel(statusCode: number): string {
        if ( 499 >= statusCode && statusCode >= 400 ) {
            return 'warn';
        } else if ( statusCode >= 500) {
            return 'error';
        }
        return 'log';
    }
}
