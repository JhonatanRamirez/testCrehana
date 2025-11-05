import React, { useMemo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

type VideoPlayerProps = {
  source?: string;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
};

const DEFAULT_HLS_URL =
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const buildHtml = (hlsUrl: string, autoPlay: boolean) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background-color: #000;
        height: 100%;
        overflow: hidden;
      }
      #video {
        width: 100%;
        height: 100%;
        background-color: #000;
      }
      #error {
        color: #fff;
        text-align: center;
        margin-top: 20px;
        font-family: -apple-system, system-ui, sans-serif;
      }
    </style>
  </head>
  <body>
    <video
      id="video"
      ${autoPlay ? 'autoplay' : ''}
      controls
      playsinline
      webkit-playsinline
    ></video>
    <div id="error"></div>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js"></script>
    <script>
      (function () {
        var video = document.getElementById('video');
        var errorDiv = document.getElementById('error');
        var src = '${hlsUrl}';

        function notifyRN(payload) {
          try {
            if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
              window.ReactNativeWebView.postMessage(JSON.stringify(payload));
            }
          } catch (e) {}
        }

        function showError(message) {
          errorDiv.textContent = message;
          notifyRN({ type: 'HLS_ERROR', message: message });
        }

        notifyRN({ type: 'INIT', src: src });

        var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (window.Hls && window.Hls.isSupported()) {
          if (isIOS) {
            video.src = src;
            notifyRN({ type: 'HLS_MODE', mode: 'native-ios' });
          } else {
            try {
              var hls = new window.Hls();
              hls.loadSource(src);
              hls.attachMedia(video);
              hls.on(window.Hls.Events.ERROR, function (event, data) {
                showError('HLS.js error: ' + (data && data.type) + ' - ' + (data && data.details));
              });
              notifyRN({ type: 'HLS_MODE', mode: 'hls.js' });
            } catch (e) {
              showError('Error inicializando hls.js: ' + e.message);
            }
          }
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          notifyRN({ type: 'HLS_MODE', mode: 'native-canPlayType' });
        } else {
          showError('HLS no soportado en este dispositivo / WebView');
        }
        document.body.addEventListener('touchstart', function () {
          if (video.paused) {
            video.play().catch(function () {});
          }
        });

        video.addEventListener('error', function () {
          var err = video.error;
          var msg = 'Video error';
          if (err) {
            msg += ' code ' + err.code;
          }
          showError(msg);
        });
      })();
    </script>
  </body>
</html>
`;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source = DEFAULT_HLS_URL,
  style,
  autoPlay = false,
}) => {
  const html = useMemo(() => buildHtml(source, autoPlay), [source, autoPlay]);

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('[VideoPlayer]', data);
    } catch {
      console.log('[VideoPlayer] raw message:', event.nativeEvent.data);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={!autoPlay}
        allowsFullscreenVideo
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default VideoPlayer;
