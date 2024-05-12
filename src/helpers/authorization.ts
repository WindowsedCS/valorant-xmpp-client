import { AxiosRequestConfig } from "axios";
import { Agent } from "https";

import { Endpoints } from "./endpoints";
import { GenericRequest } from "./requests";

// instead of ciphers, a custom axios adapter can be created that
// exposes https options, where you can set custom signature
// algorithms, and by not including sha1 we get past 1020 error
const ciphers = [
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "ECDHE-ECDSA-CHACHA20-POLY1305",
    "ECDHE-RSA-CHACHA20-POLY1305",
    "ECDHE-ECDSA-AES128-SHA256",
    "ECDHE-RSA-AES128-SHA256",
    "ECDHE-ECDSA-AES256-GCM-SHA384",
    "ECDHE-RSA-AES256-GCM-SHA384",
    "ECDHE-ECDSA-AES128-SHA",
    "ECDHE-RSA-AES128-SHA",
    "ECDHE-ECDSA-AES256-SHA",
    "ECDHE-RSA-AES256-SHA",
    "RSA-PSK-AES128-GCM-SHA256",
    "RSA-PSK-AES256-GCM-SHA384",
    "RSA-PSK-AES128-CBC-SHA",
    "RSA-PSK-AES256-CBC-SHA",
];

const tlsSigAlgs = [
    "ecdsa_secp256r1_sha256",
    "rsa_pss_rsae_sha256",
    "rsa_pkcs1_sha256",
    "ecdsa_secp384r1_sha384",
    "rsa_pss_rsae_sha384",
    "rsa_pkcs1_sha384",
    "rsa_pss_rsae_sha512",
    "rsa_pkcs1_sha512",
    "rsa_pkcs1_sha1",
 ];
const agent = new Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
const user_agent = 'ShooterGame/11 Windows/10.0.22621.1.768.64bit';
export class Authorization {
    static createSession = (options: any, headers?: any, axiosConfig?: AxiosRequestConfig) => new GenericRequest()
        .setUrl(Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('POST')
        .setHeaders({
            'User-Agent': user_agent,
            ...headers
        })
        .setBody({
            ...options
        })
        .send({
            httpsAgent: agent,
            ...axiosConfig
        });

    static login = (cookie: string, username: string, password: string, remember: boolean = true, options?: any) => new GenericRequest()
        .setUrl(Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('PUT')
        .setHeaders({
            Cookie: cookie,
            'User-Agent': user_agent
        })
        .setBody({
            type: 'auth',
            username,
            password,
            remember,
            ...options
        })
        .send({
            httpsAgent: agent
        });

    static send2faCode = (cookie: string, code: string, rememberDevice: boolean = true, options?: any) => new GenericRequest()
        .setUrl(Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('PUT')
        .setHeaders({
            Cookie: cookie,
            'User-Agent': 'ShooterGame/11 Windows/10.0.22621.1.768.64bit'
        })
        .setBody({
            type: 'multifactor',
            code,
            rememberDevice,
            ...options
        })
        .send({
            httpsAgent: agent
        });

    static fetchEntitlements = (accessToken: string) => new GenericRequest()
        .setUrl(Endpoints.Entitlements())
        .setMethod('POST')
        .setHeaders({
            Authorization: `Bearer ${accessToken}`
        })
        .setBody({})
        .send();

    static fetchPas = (accessToken: string) => new GenericRequest()
        .setUrl(Endpoints.Pas() + '/pas/v1/service/chat')
        .setMethod('GET')
        .setHeaders({
            Authorization: `Bearer ${accessToken}`
        })
        .send();
}