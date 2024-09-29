import type { H3Event } from 'h3';
import type { AnyObject, InferType, ObjectSchema } from 'yup';
import { ValidationError } from 'yup';
import { readBody } from 'h3';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

fetch('', { method: 'POST'})

export default async <T extends ObjectSchema<AnyObject>>(
    event: H3Event,
    method: HttpMethod,
    schema: T,
): Promise<InferType<T>> => {
    if (event.node.req.method !== method) {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed',
        });
    }

    const body = await readBody(event);

    try {
        return await schema.validate(body);
    } catch (error) {
        if (error instanceof ValidationError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: error.errors,
            });
        }

        throw error;
    }
};
