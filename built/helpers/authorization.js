"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const https_1 = require("https");
const endpoints_1 = require("./endpoints");
const requests_1 = require("./requests");
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
const agent = new https_1.Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
const user_agent = 'ShooterGame/11 Windows/10.0.22621.1.768.64bit';
class Authorization {
    static createSession = (options, headers, axiosConfig) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
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
    static login = (cookie, username, password, remember = true, options) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
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
    static send2faCode = (cookie, code, rememberDevice = true, options) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
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
    static fetchEntitlements = (accessToken) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Entitlements())
        .setMethod('POST')
        .setHeaders({
        Authorization: `Bearer ${accessToken}`
    })
        .setBody({})
        .send();
    static fetchPas = (accessToken) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Pas() + '/pas/v1/service/chat')
        .setMethod('GET')
        .setHeaders({
        Authorization: `Bearer ${accessToken}`
    })
        .send();
}
exports.Authorization = Authorization;
