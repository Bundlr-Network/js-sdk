/* eslint-disable @typescript-eslint/naming-convention */
import Axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosAdapter } from "axios";

// taken from the arweave.js lib
export interface ApiConfig {
    host?: string;
    protocol?: string;
    port?: string | number;
    timeout?: number;
    logging?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    logger?: Function;
    adapter?: AxiosAdapter;
}

// TODO: overhaul this
export class Api {
    public readonly METHOD_GET = "GET";
    public readonly METHOD_POST = "POST";

    public config!: ApiConfig;

    constructor(config: ApiConfig) {
        this.applyConfig(config);
    }

    public applyConfig(config: ApiConfig): void {
        this.config = this.mergeDefaults(config);
    }

    public getConfig(): ApiConfig {
        return this.config;
    }

    private mergeDefaults(config: ApiConfig): ApiConfig {
        const protocol = config.protocol || "http";
        const port = config.port || (protocol === "https" ? 443 : 80);

        return {
            host: config.host || "127.0.0.1",
            protocol,
            port,
            timeout: config.timeout || 20000,
            logging: config.logging || false,
            logger: config.logger || console.log,
            adapter: config.adapter
        };
    }

    public async get<T = any>(
        endpoint: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            return await this.request().get<T>(endpoint, config);
        } catch (error: any) {
            if (error.response && error.response.status) {
                return error.response;
            }

            throw error;
        }
    }

    public async post<T = any>(
        endpoint: string,
        body: Buffer | string | object,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            return await this.request().post(endpoint, body, config);
        } catch (error: any) {
            if (error.response && error.response.status) {
                return error.response;
            }

            throw error;
        }
    }

    public request(): AxiosInstance {
        const instance = Axios.create({
            baseURL: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
            timeout: this.config.timeout,
            maxContentLength: 1024 * 1024 * 512,
            adapter: this.config.adapter
        });

        if (this.config.logging) {
            instance.interceptors.request.use((request) => {
                this.config.logger!(`Requesting: ${request.baseURL}/${request.url}`);
                return request;
            });

            instance.interceptors.response.use((response) => {
                this.config.logger!(
                    `Response:   ${response.config.url} - ${response.status}`
                );
                return response;
            });
        }

        return instance;
    }
}