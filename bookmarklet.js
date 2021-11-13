void async function () {
  const videoId = window.location.search?.split("v=")[1].split("&");
  if (!videoId) return;

  const dislikeCounter =
    document.querySelectorAll(
      ".style-scope .ytd-toggle-button-renderer .style-text",
    )[3];
  if (!dislikeCounter) return;

  const statistics =
    await (await fetch(`https://i-dislike-youtube.deno.dev?id=${videoId}`))
      .json();

  if (statistics.dislikes) {
    dislikeCounter.textContent = statistics.dislikes;
  }
}();
