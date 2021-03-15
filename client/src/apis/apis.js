import axios from 'axios';

/**
 * finds out if using localhost in dev
 * @type {boolean}
 */
export const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	window.location.hostname === '[::1]' ||
	// 127.0.0.0/8 are considered localhost for IPv4.
	window.location.hostname.match(
		/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	)
);

/**
 * updates protpcol to less secure protocol
 * @returns {string}
 */
export const getProtocol = (httpOverride=false) => {
	if (!httpOverride && window.location.protocol === 'https:') return 'https:';
	return 'http:'
};

/**
 *
 * @returns {string}
 */
export const getPort = (httpOverride=false) => {
	if (!httpOverride && window.location.protocol === 'https:') return '10999';
	return '5000'
};

export const customHeaders = {
	//enter custom headers for override
};

const HTTP_OVERRIDE = true;
const USE_STAGING = false;
const USE_PROD = false;
const USE_CUSTOM_HEADERS = false;
const USE_LOCAL = true;
const LocalAPI = "localhost";
const DefaultAPI = LocalAPI;

//TODO grab from enviroment variables
const StagingAPI = "apis.staging.com";
const ProductionAPI = "www.production.com";

// Instance of axios api, uses protocol and host of the env, and headers to multipart/form-data since we're using old


let apiObj = {
	baseURL: `${getProtocol(HTTP_OVERRIDE)}//${USE_STAGING ? StagingAPI : USE_PROD ? ProductionAPI : USE_LOCAL || isLocalhost() ? LocalAPI : DefaultAPI}:${getPort(HTTP_OVERRIDE)}/`
};

if (USE_CUSTOM_HEADERS) {
	apiObj["headers"] = customHeaders;
};

export default axios.create(apiObj);
