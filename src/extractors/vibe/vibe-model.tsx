// custom playlist

interface CustomListAllResponse {
  response: CustomListResponse;
}

interface CustomListResponse {
  result: CustomListResult;
}

interface CustomListResult {
  trackTotalCount: number;
  statusDownload: "ALL";
  statusStreaming: "ALL";
  tracks: Track[]
}


// vibe playlist

interface VibeListAllResponse {
  response: VibeListResponse;
}

interface VibeListResponse {
  result: VibeListResult;
}

interface VibeListResult {
  playlist: PlayList;
}

interface PlayList {
  title: string;
  sub: string;
  tracks: Track[]
}


// common

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
  CustomListAllResponse,
  CustomListResponse,
  CustomListResult,

  VibeListAllResponse,
  VibeListResponse,
  VibeListResult,

  Track,
  Artist,
  Album,
};