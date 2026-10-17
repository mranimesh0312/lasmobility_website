import styles from "./WebGLFallback.module.scss";

/** Shown when WebGL is unavailable or the 3D scene throws. Content stays readable. */
export default function WebGLFallback({ message = "Interactive 3D is not available in this browser." }: { message?: string }) {
  return (
    <div className={styles.fallback} role="img" aria-label="Vehicle illustration">
      <svg viewBox="0 0 480 180" className={styles.silhouette} aria-hidden="true">
        <path d="M30 128h18a34 34 0 0 1 68 0h196a34 34 0 0 1 68 0h40l-6-34c-2-10-10-16-22-18l-58-8-56-38c-8-6-18-8-28-8H178c-14 0-26 6-36 14l-36 32-48 8c-14 2-24 12-26 26z" />
        <circle cx="82" cy="130" r="26" />
        <circle cx="346" cy="130" r="26" />
      </svg>
      <p className={styles.note}>{message}</p>
    </div>
  );
}
