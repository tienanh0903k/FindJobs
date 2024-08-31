// src/api/httpClient.ts

interface CustomRequestInit extends RequestInit {
    baseUrl?: string;
}

const request = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomRequestInit
): Promise<Response> => {
    const { baseUrl, body, headers, ...rest } = options || {};
    
    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    };

    const finalBaseUrl = baseUrl || 'http://localhost:3001';
    const response = await fetch(`${finalBaseUrl}${url}`, fetchOptions);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }
    
    return response;
};

const httpClient = {
    async get(url: string, options?: CustomRequestInit): Promise<any> {
        const response = await request('GET', url, options);
        return response.json();
    },

    async post(url: string, body: any, options?: CustomRequestInit): Promise<any> {
        const response = await request('POST', url, { ...options, body });
        return response
    },

    async put(url: string, body: any, options?: CustomRequestInit): Promise<any> {
        const response = await request('PUT', url, { ...options, body });
        return response
    },

    async delete(url: string, options?: CustomRequestInit): Promise<any> {
        const response = await request('DELETE', url, options);
        return response
    }
};

export default httpClient;
