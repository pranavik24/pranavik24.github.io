export const LAST_FM_API_URL = 'https://ws.audioscrobbler.com/2.0/';

const ARTWORK_SIZES = ['extralarge', 'large', 'medium', 'small'];

function readTextValue(value) {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value && typeof value['#text'] === 'string') {
    return value['#text'].trim();
  }

  return '';
}

function selectArtwork(images) {
  if (!Array.isArray(images)) {
    return '';
  }

  for (const size of ARTWORK_SIZES) {
    const image = images.find((candidate) => candidate?.size === size && readTextValue(candidate['#text']));
    if (image) {
      return readTextValue(image['#text']);
    }
  }

  return readTextValue(images.find((candidate) => readTextValue(candidate?.['#text']))?.['#text']);
}

export function getArtworkSources(primaryImage, fallbackImage) {
  return [primaryImage, fallbackImage].filter(
    (source, index, sources) => source && sources.indexOf(source) === index,
  );
}

export function buildLastFmUrl({ apiKey, username, limit = 1 }) {
  if (!apiKey?.trim() || !username?.trim()) {
    throw new Error('Last.fm API key and username are required');
  }

  const requestUrl = new URL(LAST_FM_API_URL);
  requestUrl.search = new URLSearchParams({
    method: 'user.getrecenttracks',
    user: username.trim(),
    api_key: apiKey.trim(),
    format: 'json',
    limit: String(limit),
  });

  return requestUrl.toString();
}

export function buildLastFmTrackInfoUrl({ apiKey, artist, track }) {
  if (!apiKey?.trim() || !artist?.trim() || !track?.trim()) {
    throw new Error('Last.fm API key, artist, and track are required');
  }

  const requestUrl = new URL(LAST_FM_API_URL);
  requestUrl.search = new URLSearchParams({
    method: 'track.getInfo',
    artist: artist.trim(),
    track: track.trim(),
    api_key: apiKey.trim(),
    autocorrect: '1',
    format: 'json',
  });

  return requestUrl.toString();
}

export function formatLastFmDuration(durationMilliseconds) {
  const duration = Number(durationMilliseconds);
  if (!Number.isFinite(duration) || duration <= 0) {
    return '';
  }

  const totalSeconds = Math.round(duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function normalizeLastFmTrack(payload) {
  const track = payload?.recenttracks?.track?.[0];
  if (!track) {
    return null;
  }

  return {
    title: readTextValue(track.name) || 'Unknown track',
    artist: readTextValue(track.artist) || 'Unknown artist',
    album: readTextValue(track.album),
    image: selectArtwork(track.image),
    playedAt: readTextValue(track.date?.uts),
    isNowPlaying: track['@attr']?.nowplaying === 'true',
    duration: '',
  };
}

async function fetchLastFmDuration({ apiKey, artist, track, fetchImplementation }) {
  const response = await fetchImplementation(
    buildLastFmTrackInfoUrl({ apiKey, artist, track }),
  );

  if (!response.ok) {
    throw new Error('Unable to load Last.fm track duration');
  }

  const payload = await response.json();
  if (payload?.error) {
    throw new Error('Unable to load Last.fm track duration');
  }

  return formatLastFmDuration(payload?.track?.duration);
}

export async function fetchLastFmTrack({ apiKey, username, fetchImplementation = fetch }) {
  const response = await fetchImplementation(buildLastFmUrl({ apiKey, username }));

  if (!response.ok) {
    throw new Error('Unable to load latest Last.fm track');
  }

  const payload = await response.json();
  if (payload?.error) {
    throw new Error('Unable to load latest Last.fm track');
  }

  const track = normalizeLastFmTrack(payload);
  if (!track) {
    return null;
  }

  let duration = '';
  try {
    duration = await fetchLastFmDuration({
      apiKey,
      artist: track.artist,
      track: track.title,
      fetchImplementation,
    });
  } catch {
    // Track metadata is still useful when Last.fm has no duration for it.
  }

  return { ...track, duration };
}
