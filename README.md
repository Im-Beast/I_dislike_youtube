# I dislike YouTube.
We hate YouTube's new change of removing dislike count, don't we?

Thats where [this REST API](https://i-dislike-youtube.deno.dev/) comes in!
It allows you to check dislike count of any video you want.

### Bookmarklet
Create new bookmark where URL is this code: 
`javascript: fetch("https://raw.githubusercontent.com/Im-Beast/I_dislike_youtube/main/bookmarklet.js").then(x => x.text()).then(eval)`

## Required parameters
### id - Youtube video id
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
```

## Optional parameters
### key - Optional custom OAuth key

## Response
```ts
type DeployResponse = {
  videoId: string;
  views: number;
  likes: number;
  dislikes: number;
  favorites: number;
  comments: number;
} | { error: string };
```

## Example
### Request
```javascript
https://i-dislike-youtube.deno.dev?id=dQw4w9WgXcQ
// or https://i-dislike-youtube.deno.dev?id=dQw4w9WgXcQ&key=YOUROAUTHKEY
```
### Response
```json
{
 "videoId": "dQw4w9WgXcQ",
 "likes": "12562055",
 "dislikes": "336976",
 "views": "1090574199",
 "comments": "2009252",
 "favorites": "0"
}
```

# This API will probably break on December 13, 2021
