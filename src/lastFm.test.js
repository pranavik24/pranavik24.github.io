import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildLastFmUrl,
  buildLastFmTrackInfoUrl,
  fetchLastFmTrack,
  formatLastFmDuration,
  getArtworkSources,
  normalizeLastFmTrack,
  parseLastFmDuration,
} from './lastFm.js';

describe('Last.fm integration', () => {
  it('builds a recent tracks request with encoded credentials', () => {
    const requestUrl = new URL(
      buildLastFmUrl({ apiKey: 'api key', username: 'pranavi & co' }),
    );

    assert.equal(requestUrl.origin, 'https://ws.audioscrobbler.com');
    assert.equal(requestUrl.pathname, '/2.0/');
    assert.equal(requestUrl.searchParams.get('method'), 'user.getrecenttracks');
    assert.equal(requestUrl.searchParams.get('user'), 'pranavi & co');
    assert.equal(requestUrl.searchParams.get('api_key'), 'api key');
    assert.equal(requestUrl.searchParams.get('format'), 'json');
    assert.equal(requestUrl.searchParams.get('limit'), '1');
  });

  it('builds a track metadata request for duration lookup', () => {
    const requestUrl = new URL(
      buildLastFmTrackInfoUrl({
        apiKey: 'test-key',
        artist: 'AJ Vitanza',
        track: 'BLAME MYSELF',
      }),
    );

    assert.equal(requestUrl.searchParams.get('method'), 'track.getInfo');
    assert.equal(requestUrl.searchParams.get('artist'), 'AJ Vitanza');
    assert.equal(requestUrl.searchParams.get('track'), 'BLAME MYSELF');
    assert.equal(requestUrl.searchParams.get('format'), 'json');
  });

  it('formats Last.fm milliseconds as minutes and seconds', () => {
    assert.equal(formatLastFmDuration('215000'), '3:35');
    assert.equal(formatLastFmDuration(60000), '1:00');
    assert.equal(formatLastFmDuration(''), '');
  });

  it('parses a formatted duration into seconds for the player timeline', () => {
    assert.equal(parseLastFmDuration('3:35'), 215);
    assert.equal(parseLastFmDuration('0:07'), 7);
    assert.equal(parseLastFmDuration('3:60'), 0);
    assert.equal(parseLastFmDuration(''), 0);
  });

  it('normalizes the latest track and chooses the largest available artwork', () => {
    const track = normalizeLastFmTrack({
      recenttracks: {
        track: [
          {
            name: 'Midnight On My Mind',
            artist: { '#text': 'MANSA' },
            album: { '#text': 'After Hours' },
            image: [
              { '#text': 'small-artwork.jpg', size: 'small' },
              { '#text': 'large-artwork.jpg', size: 'large' },
            ],
            date: { '#text': '25 Aug 2026, 12:30', uts: '1787661000' },
          },
        ],
      },
    });

    assert.deepEqual(track, {
      title: 'Midnight On My Mind',
      artist: 'MANSA',
      album: 'After Hours',
      image: 'large-artwork.jpg',
      playedAt: '1787661000',
      isNowPlaying: false,
      duration: '',
    });
  });

  it('keeps local artwork as a fallback when remote artwork fails', () => {
    assert.deepEqual(
      getArtworkSources(
        'https://lastfm-img.freetls.fastly.net/track.jpg',
        '/midnightonmymind.jpeg',
      ),
      [
        'https://lastfm-img.freetls.fastly.net/track.jpg',
        '/midnightonmymind.jpeg',
      ],
    );

    assert.deepEqual(
      getArtworkSources('/midnightonmymind.jpeg', '/midnightonmymind.jpeg'),
      ['/midnightonmymind.jpeg'],
    );
  });

  it('fetches and normalizes the latest track', async () => {
    const calls = [];
    const responses = [
      {
        recenttracks: {
          track: [{
            name: 'Test Track',
            artist: { '#text': 'Test Artist' },
            image: [],
            '@attr': { nowplaying: 'true' },
          }],
        },
      },
      {
        track: {
          duration: '215000',
        },
      },
    ];
    const track = await fetchLastFmTrack({
      apiKey: 'test-key',
      username: 'pranavi',
      fetchImplementation: async (url) => {
        calls.push(url);
        return new Response(JSON.stringify(responses.shift()), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    });

    assert.equal(calls.length, 2);
    assert.equal(new URL(calls[1]).searchParams.get('method'), 'track.getInfo');
    assert.equal(track.title, 'Test Track');
    assert.equal(track.artist, 'Test Artist');
    assert.equal(track.isNowPlaying, true);
    assert.equal(track.duration, '3:35');
  });

  it('keeps the track when duration metadata is unavailable', async () => {
    const responses = [
      {
        recenttracks: {
          track: [{ name: 'Test Track', artist: { '#text': 'Test Artist' }, image: [] }],
        },
      },
      { error: 6, message: 'Invalid parameters' },
    ];

    const track = await fetchLastFmTrack({
      apiKey: 'test-key',
      username: 'pranavi',
      fetchImplementation: async () => new Response(JSON.stringify(responses.shift()), { status: 200 }),
    });

    assert.equal(track.title, 'Test Track');
    assert.equal(track.duration, '');
  });

  it('rejects missing configuration and upstream failures', async () => {
    await assert.rejects(
      fetchLastFmTrack({ apiKey: '', username: 'pranavi' }),
      /API key and username are required/,
    );

    await assert.rejects(
      fetchLastFmTrack({
        apiKey: 'test-key',
        username: 'pranavi',
        fetchImplementation: async () => new Response('{}', { status: 503 }),
      }),
      /Unable to load latest Last\.fm track/,
    );
  });
});
