import { config } from "@/src/constants";

type FetcherArgs = {
    url: string
    method: "GET" | "POST" | "PATCH" | "DELETE"
    body?: string
}

const fetcher = async <T>({
    url,
    method,
    body
}: FetcherArgs): Promise<T> => {
    const response = await fetch(`${config.baseURL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    if (!response.ok){
        console.log(response.status)
        console.log(response.json())
        throw new Error("Request failed")
    }

    return response.json()
}

export {
    fetcher
}