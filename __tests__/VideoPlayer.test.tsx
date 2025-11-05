import React from 'react';
import { render } from '@testing-library/react-native';
import VideoPlayer from '../src/presentation/components/VideoPlayer';

const mockWebView = jest.fn((props: any) => null);

jest.mock('react-native-webview', () => {
  return {
    WebView: (props: any) => {
      mockWebView(props);
      return null;
    },
  };
});

describe('VideoPlayer', () => {
  beforeEach(() => {
    mockWebView.mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => {});   
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
  });

  it('renders WebView with default HLS URL and default props', () => {
    render(<VideoPlayer />);

    expect(mockWebView).toHaveBeenCalledTimes(1);
    const props = mockWebView.mock.calls[0][0];

    expect(props.originWhitelist).toEqual(['*']);
    expect(props.allowsInlineMediaPlayback).toBe(true);
    expect(props.allowsFullscreenVideo).toBe(true);
    expect(props.mediaPlaybackRequiresUserAction).toBe(true);

    expect(props.source).toBeDefined();
    expect(props.source.html).toContain(
      'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    );
  });

  it('passes custom source and autoPlay=false correctly', () => {
    mockWebView.mockClear();

    render(
      <VideoPlayer source="https://example.com/video.m3u8" autoPlay={false} />,
    );

    expect(mockWebView).toHaveBeenCalledTimes(1);
    const props = mockWebView.mock.calls[0][0];

    expect(props.mediaPlaybackRequiresUserAction).toBe(true);
    expect(props.source.html).toContain('https://example.com/video.m3u8');
  });

  it('passes custom source and autoPlay=true correctly', () => {
    mockWebView.mockClear();

    render(
      <VideoPlayer source="https://example.com/auto.m3u8" autoPlay={true} />,
    );

    expect(mockWebView).toHaveBeenCalledTimes(1);
    const props = mockWebView.mock.calls[0][0];

    expect(props.mediaPlaybackRequiresUserAction).toBe(false);
    expect(props.source.html).toContain('https://example.com/auto.m3u8');
  });

  it('handles valid JSON messages from WebView (try block)', () => {
    render(<VideoPlayer />);

    const props = mockWebView.mock.calls[0][0];
    const onMessage = props.onMessage as (e: any) => void;

    expect(() =>
      onMessage({
        nativeEvent: {
          data: JSON.stringify({ type: 'INIT', src: 'foo.m3u8' }),
        },
      }),
    ).not.toThrow();
  });

  it('handles invalid JSON messages from WebView (catch block)', () => {
    render(<VideoPlayer />);

    const props = mockWebView.mock.calls[0][0];
    const onMessage = props.onMessage as (e: any) => void;

    expect(() =>
      onMessage({
        nativeEvent: { data: 'this-is-not-json' },
      }),
    ).not.toThrow();
  });
});
