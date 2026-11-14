import { useRef, useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function SectionBridgeVideo({ src, poster, className = "" }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const hideControlsTimer = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = null;
    }
  }, []);

  const scheduleHideControls = useCallback(() => {
    clearHideTimer();
    if (!playing) return;
    hideControlsTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2500);
  }, [playing, clearHideTimer]);

  useEffect(() => {
    return () => clearHideTimer();
  }, [clearHideTimer]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
      setControlsVisible(true);
      scheduleHideControls();
    } else {
      el.pause();
      setPlaying(false);
      clearHideTimer();
      setControlsVisible(true);
    }
  }, [scheduleHideControls, clearHideTimer]);

  const toggleMute = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    setControlsVisible(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  const onTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (el) setCurrentTime(el.currentTime);
  }, []);

  const onLoadedMetadata = useCallback(() => {
    const el = videoRef.current;
    if (el) setDuration(el.duration || 0);
  }, []);

  const onSeek = useCallback(
    (e) => {
      const el = videoRef.current;
      const bar = progressBarRef.current;
      if (!el || !bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      el.currentTime = (x / rect.width) * duration;
      setCurrentTime(el.currentTime);
    },
    [duration]
  );

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      void el.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
    setControlsVisible(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const run = () => {
      const p = v.play();
      if (p !== undefined) {
        void p.catch(() => setPlaying(false));
      }
    };
    run();
  }, [src]);

  useEffect(() => {
    if (playing) scheduleHideControls();
    else {
      clearHideTimer();
      setControlsVisible(true);
    }
  }, [playing, scheduleHideControls, clearHideTimer]);

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-black/10 ${className}`}
      onMouseEnter={() => {
        setControlsVisible(true);
        clearHideTimer();
      }}
      onMouseLeave={() => {
        if (playing) scheduleHideControls();
      }}
      onMouseMove={() => {
        setControlsVisible(true);
        if (playing) scheduleHideControls();
      }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted={muted}
        playsInline
        preload="metadata"
        poster={poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Big play when paused */}
      {!playing && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 transition-opacity hover:bg-black/45"
          aria-label="Play video"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg sm:h-20 sm:w-20"
            style={{ background: "var(--ccsa-gradient)" }}
          >
            <Icon icon="mdi:play" className="h-10 w-10 sm:h-12 sm:w-12" />
          </span>
        </button>
      )}

      {/* Bottom bar */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 pb-2 pt-10 transition-opacity duration-300 sm:px-4 sm:pb-3 ${
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          ref={progressBarRef}
          role="slider"
          aria-label="Seek video"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          className="mb-2 h-1.5 w-full cursor-pointer rounded-full bg-white/25 sm:h-2"
          onClick={(e) => {
            e.stopPropagation();
            onSeek(e);
          }}
          onKeyDown={(e) => {
            const el = videoRef.current;
            if (!el || !duration) return;
            const step = 5;
            if (e.key === "ArrowRight") {
              e.preventDefault();
              el.currentTime = Math.min(el.currentTime + step, duration);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              el.currentTime = Math.max(el.currentTime - step, 0);
            }
          }}
        >
          <div
            className="h-full rounded-full bg-ccsa-yellow transition-[width] duration-100 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label={playing ? "Pause" : "Play"}
          >
            <Icon icon={playing ? "mdi:pause" : "mdi:play"} className="h-6 w-6" />
          </button>

          <span className="min-w-[4.5rem] font-mono text-xs tabular-nums text-white/90 sm:text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            <Icon
              icon={muted ? "mdi:volume-off" : "mdi:volume-high"}
              className="h-6 w-6"
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label="Fullscreen"
          >
            <Icon
              icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
