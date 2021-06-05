interface VibeResponse {
  response: Response;
}

interface Response {
  result: Result;
}

interface Result {
  trackTotalCount: number;
  statusDownload: "ALL";
  statusStreaming: "ALL";
  tracks: Track[]
}

interface Track {
  trackTitle: string;
  artists: Artist[];
  album: Album;
}

interface Artist {
  artistName: string;
}

interface Album {
  albumTitle: string;
  releastDate: string;
}

export type {
  VibeResponse,
  Response,
  Result,
  Track,
  Artist,
  Album,
};