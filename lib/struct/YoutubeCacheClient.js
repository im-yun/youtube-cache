const fetch = require("node-fetch");
const { GATEWAY, VERSION, VIDEO_ENDPOINT } = require("./constants");

class YouTubeCacheClient {
	// START TYPES

	/**
	 * @typedef {object} Track
	 * @property {string} identifier
	 * @property {string} title
	 * @property {string} author
	 * @property {string} artwork
	 * @property {number} duration
	 * @property {string} created_at
	 * @property {string} updated_at
	 */

	/**
	 * @typedef {object} TrackResult
	 * @property {string} loadType
	 * @property {Track} track
	 */

	/**
	 * @typedef {object} TrackResults
	 * @property {string} loadType
	 * @property {Track[]} tracks
	 */

	// END TYPES

	/**
	 * @param {string} token  - Login Token
	 * @example
	 * const cache = new youtube("Your Token")
	 */
	constructor(token) {
		//Get the api link and make it login here

		// Mega brain lol same like my package
		if (typeof token === undefined || token === "") {
			//Bruh big brains
			throw new TypeError("Token Missing");
		}

		if (!token.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
			throw new TypeError("Invalid token format. Should be valid UUID v4");
		}

		this.token = token;
	}

	/**
	 *
	 * @param {string} identifier - YouTube Video Id
	 * @returns {Promise<TrackResult>}
	 * @example
	 *
	 * getVideoById("dQw4w9WgXcQ").then((result) => {
	 *  // do stuff with track object
	 *  const track = result.track;
	 * }).catch((err) => {
	 *   // OOF something went wrong handle it!.
	 * });
	 */
	getVideoById(identifier) {
		if (typeof identifier === undefined || identifier === "") {
			throw new TypeError("Identifier Missing");
		}

		return new Promise((resolve, reject) => {
			fetch(this._getVideoApi() + identifier, {
				headers: {
					"Content-Type": "application/json",
					Authorization: this.token,
				},
			})
				.then((res) => res.json())
				.then((body) => {
					return resolve(body);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 *
	 * @param {string} name - Name to query by
	 * @returns {Promise<TrackResult>}
	 * @example
	 *
	 * queryVideos("Never gonna give you up").then((result) => {
	 *  // returns array of results
	 *  const track = result.tracks;
	 * }).catch((err) => {
	 *   // OOF something went wrong handle it!.
	 * });
	 */
	queryVideos(name) {
		if (typeof name !== "string") {
			throw new TypeError("Name should not be Numbe");
		}

		if (typeof name !== "string" || name.length <= 0) {
			throw new TypeError("name Missing");
		}

		return new Promise((resolve, reject) => {
			fetch(this._getVideoApi() + `?q=${name}`, {
				headers: {
					"Content-Type": "application.json",
					Authorization: this.token,
				},
			})
				.then((res) => res.json())
				.then((body) => {
					return resolve(body);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Used to store video in cache db!! ANY abuse will result in token revoke
	 *
	 * @param {Object} obj
	 * @param {string} obj.identifier - YouTube video id
	 * @param {string} obj.title - YouTube video title
	 * @param {string} obj.author - YouTube Channel who posted this
	 * @param {string} obj.artwork - Video thumbnail
	 * @param {number} obj.duration - Duration IN SECONDS
	 *
	 * @returns {Promise<Object>}
	 * @example
	 *
	 * createVideo({
	 * identifier: "QpR8_Onc9ho",
	 * title: "Awaken",
	 * author: "Valerie Broussard",
	 * artwork: "https://img.youtube.com/vi/QpR8_Onc9ho/0.jpg",
	 * duration: 200
	 * }).then((track) => {
	 *  // Object of video created
	 * }).catch((err) => {
	 *   // something went wrong!!
	 * })
	 */
	createVideo(obj) {
		// Object verefication

		// Check if obj exists + has enough props
		if (!obj || Object.keys(obj).length < 5) {
			throw new Error("Video object was not provided or missing one of `identifier`, `title`, `author`, `artwork`, `duration` these propertys");
		}

		if (typeof obj.identifier !== "string") {
			throw new TypeError("Video property of `identifier` must be string");
		}

		if (typeof obj.title !== "string") {
			throw new TypeError("Video property of `title` must be string");
		}

		if (typeof obj.author !== "string") {
			throw new TypeError("Video property of `author` must be string");
		}

		if (typeof obj.artwork !== "string") {
			throw new TypeError("Video property of `artwork` must be string");
		}

		if (typeof obj.duration !== "number") {
			throw new TypeError("Video property of `duration` must be number");
		}

		// Enough checks

		return new Promise((resolve, reject) => {
			fetch(this._getVideoApi(), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: this.token,
				},
				body: JSON.stringify(obj),
			})
				.then((res) => res.json())
				.then((body) => {
					return resolve(body);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}

	/**
	 * Rteruns api with current version
	 * @private
	 * @returns string
	 */
	_getFullApi() {
		return GATEWAY(VERSION);
	}

	/**
	 * api + video endpoint
	 * @private
	 * @returns string
	 */
	_getVideoApi() {
		return this._getFullApi() + VIDEO_ENDPOINT;
	}
}

// Good English
module.exports = { YouTubeCacheClient };
