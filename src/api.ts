import { partial } from 'ramda';

const baseUrl = "http://localhost:3001/"

const processResponse = (response: Response): Promise<any> => response.json()

export const get = (url: string) => fetch(baseUrl + url).then(processResponse)

const postPutPatch = (method: "POST" | "PUT" | "PATCH", url: string, requestData: object) => fetch(
    baseUrl + url, {
        method,
        body: JSON.stringify(requestData),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(processResponse)

export const post = partial(postPutPatch, ["POST"])

export const put = partial(postPutPatch, ["PUT"])

export const patch = partial(postPutPatch, ["PATCH"])

export const del = (url: string) => fetch(baseUrl + url, {
    method: "DELETE"
}).then(processResponse)
