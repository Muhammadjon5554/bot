import youtubedl from "youtube-dl-exec";
import Ffmpeg from "fluent-ffmpeg";
youtubedl("https://www.youtube.com/watch?v=GLjPyo3ThV8", {
  dumpSingleJson: true,
}).then((data) => {
  const audio = data.formats.find(
    (format) =>
      format.ext === "m4a" ||
      (format.ext === "webm" && format.resolution === "audio only")
  );
  const video = data.formats
    .reverse()
    .find(
      (format) =>
        format.format.includes("4320p") ||
        format.format.includes("2160p") ||
        format.format.includes("1080p") ||
        format.format.includes("720p") ||
        format.format.includes("480p") ||
        format.format.includes("360p") ||
        format.format.includes("144p") ||
        format.format.includes("1080x720")
    );
  Ffmpeg()
    .input(video.url)
    .input(audio.url)
    .outputOptions(["-c:v copy", "-c:a aac"])
    .save(video.format + ".mp4")
    .on("end", () => {
      console.log("Audio and video merged successfully!");
    })
    .on("error", (err) => {
      console.log("error", err);
    });
});
