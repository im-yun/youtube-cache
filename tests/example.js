const YouTubeCacheClient = require("../lib/struct/index");

// You need to ask Cloud#9476 on discord for your key.
const cache = new YouTubeCacheClient("Your-Key");

(async () => {
	const result = await cache.getVideoById("dQw4w9WgXcQ");

	console.log(result);

	const results = await cache.queryVideos("Never gonna give you up");

	console.log(results);

	// Time to store new Video!

	try {
		const newStored = await cache.createVideo({
			identifier: "QpR8_Onc9ho",
			title: "Awaken",
			author: "Valerie Broussard",
			artwork: "https://img.youtube.com/vi/QpR8_Onc9ho/0.jpg",
			duration: 200,
		});
		// wow we now have our created track
		console.log(newStored);
		if (newStored.errorType && newStored.errorType === "CONFLICT") {
			// VIDEO WAS ALREADY added before
			console.log("big sad");
		}
	} catch (err) {
		// Something bad happend
		console.log(err);
	}
})();
