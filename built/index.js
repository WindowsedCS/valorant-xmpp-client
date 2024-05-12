"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builders = exports.Internal = exports.GenericRequest = exports.XmppRegions = exports.Endpoints = exports.ValorantXmppClient = void 0;
const client_1 = require("./client/client");
Object.defineProperty(exports, "ValorantXmppClient", { enumerable: true, get: function () { return client_1.ValorantXmppClient; } });
Object.defineProperty(exports, "Internal", { enumerable: true, get: function () { return client_1.Internal; } });
const endpoints_1 = require("./helpers/endpoints");
Object.defineProperty(exports, "Endpoints", { enumerable: true, get: function () { return endpoints_1.Endpoints; } });
Object.defineProperty(exports, "XmppRegions", { enumerable: true, get: function () { return endpoints_1.XmppRegions; } });
const requests_1 = require("./helpers/requests");
Object.defineProperty(exports, "GenericRequest", { enumerable: true, get: function () { return requests_1.GenericRequest; } });
exports.Builders = require("./builders/builders");
exports.default = client_1.ValorantXmppClient;