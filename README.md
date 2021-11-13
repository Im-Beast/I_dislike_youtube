# I dislike YouTube.
We hate YouTube's new change of removing dislike count, don't we?

Thats where [this REST API](https://i-dislike-youtube.deno.dev/) comes in!
It allows you to check dislike count of any video you want.

# Required parameters
## id - Youtube video id
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
```

# Optional parameters
## key - Optional custom OAuth key

# Response
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
