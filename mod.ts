import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const OAuthKey = Deno.env.get("OAUTHKEY");

interface RatingResponse {
  kind: "youtube#videoGetRatingResponse";
  items: [
    {
      id: string;
      statistics: {
        viewCount: number;
        likeCount: number;
        dislikeCount: number;
        favoriteCount: number;
        commentCount: number;
      };
    },
  ];
}

type DeployResponse = {
  videoId: string;
  views: number;
  likes: number;
  dislikes: number;
  favorites: number;
  comments: number;
} | { error: string };

export async function getVideoStatistics(
  id: string,
  key = OAuthKey,
): Promise<DeployResponse> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=statistics`,
  );
  const json: RatingResponse = await response.json();

  if (!json?.items?.[0]?.statistics) {
    return { error: "Unable to get statistics for this video id" };
  }

  const { viewCount, commentCount, dislikeCount, favoriteCount, likeCount } =
    json.items[0].statistics;

  return {
    videoId: id,
    likes: likeCount,
    dislikes: dislikeCount,
    views: viewCount,
    comments: commentCount,
    favorites: favoriteCount,
  };
}

async function handler(req: Request): Promise<Response> {
  const args = req.url.split(/\?|&/).slice(1);
  const parsed: { [key: string]: string } = {};

  for (const arg of args) {
    const value = arg.split("=");
    parsed[value[0]] = value.slice(1).join();
  }

  if (!parsed.id) {
    return new Response(
      JSON.stringify(
        { error: "You are missing one of these arguments: id" },
        null,
        1,
      ),
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }

  const statistics = await getVideoStatistics(parsed.id, parsed?.key);

  return new Response(JSON.stringify(statistics, null, 1), {
    headers: {
      "content-type": "application/json",
    },
  });
}

await serve(handler);
