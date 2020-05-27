# Youtube-Cache

A simple Node wrapper of `youtube-cache` api used to fetch/store videos you fetch from youtube to save quota reuests.

# Requiremnts

- Node 11.x+
- Valid api key

# Examples

First let's download `youtube-cache` package

NPM
```
npm i youtube-cache
```

Yarn
```
yarn add youtube cache
```


Create your api client with

```js
const YoutubeCacheClient = require("youtube-cache");

const cache = new YoutubeCacheClient("Your-Token-Here");
```

Fetch youtube video directly by id.

```js

// Using await
try {
  const result = await cache.findVideoById("dQw4w9WgXcQ");
  const track = result.track;
  console.log(track); // Wow we have our fetched video!
} catch(err) {
    // big bad wold
}

// Using chain

cache.findVideoById("dQw4w9WgXcQ").then((result) => {
 const track = result.track;
 console.log(track); // Cool track
}).catch((err) => {
    // Something bad happend.
});
```

Query api by name
```js

// Using await

try {
    const result = await cache.queryVideos("Never gonna give you up");
    const tracks = result.tracks; // Array of Tracks!
    console.log(tracks);
} catch(err) {
  // error
}

// Using chain

cache.queryVideos("Never gonna give you up").then((result) => {
    const tracks = result.tracks;
    console.log(tracks); // array!
}).catch((err) => {
    // error
});
```

You might say this is really good, but how do I store my videos I fetched from youtube on your api?

Pretty simple
```js
// Using await

try {

  const result = await cache.createVideo({
      identifier: "QpR8_Onc9ho",
      title: "Awaken",
      author: "Valerie Broussard",
      artwork: "https://img.youtube.com/vi/QpR8_Onc9ho/0.jpg",
      duration: 200
  });

  // response object from api;
  console.log(result);

} catch(err) {
    // error
}

// using chain

cache.createVideo({
    identifier: "QpR8_Onc9ho",
    title: "Awaken",
    author: "Valerie Broussard",
    artwork: "https://img.youtube.com/vi/QpR8_Onc9ho/0.jpg",
    duration: 200
}).then((result) => {
  // Response object from api.
  console.log(result);
}).catch((err) => {
    // error
});

```


# Road map

| Task              | Implemeted    | Implemented in api  |
| ----------------- |:-------------:| :-----------------: |
| Fetch Video By ID | ✅            | ✅                 |
| Query Video       | ✅            | ✅                 |
| Store video       | ✅            | ✅                 |
| Playlist support  | ❌            | ❌                 |
| Youtube Api       | ❌            | ❌                 |


In future there will be way to query for playilsts and automaticly use youtube api from this package. Also ability to store multiples video from such playlist.


# Access 

You must be thinking this is really cool! How can I access it? Well you can message me on discord `Cloud#9476` as this is invite only at this current moment.