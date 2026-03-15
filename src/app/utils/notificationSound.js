/**
 * notificationSound.js
 *
 * Chrome AudioContext lifecycle:
 *  - new AudioContext() → created in "suspended" state (no gesture needed)
 *  - audioContext.resume() → must be called inside a user gesture handler
 *  - Once "running", stays running for the entire session
 *
 * Strategy:
 *  1. Create AudioContext + decode audio buffer immediately on module load
 *  2. On first user click/key → resume the context (now "running")
 *  3. playIPLSound() → if running: play instantly; if still suspended: queue
 */

// ── Create context immediately (suspended, but allowed) ──────────────────────
const _audioContext = new (window.AudioContext || window.webkitAudioContext)();
let _audioBuffer = null;
let _pendingPlay = false;

// ── Pre-fetch & decode audio (works even while context is suspended) ──────────
fetch('/notification.mp3')
    .then(r => r.arrayBuffer())
    .then(ab => _audioContext.decodeAudioData(ab))
    .then(buffer => {
        _audioBuffer = buffer;
        console.log('[IPLSound] Audio pre-loaded ✓, ctx state:', _audioContext.state);
    })
    .catch(err => console.warn('[IPLSound] Pre-load failed:', err));

// ── Resume context on first user gesture ─────────────────────────────────────
function _onFirstInteraction() {
    if (_audioContext.state === 'running') return;

    _audioContext.resume().then(() => {
        console.log('[IPLSound] AudioContext resumed ✓, state:', _audioContext.state);
        if (_pendingPlay) {
            _pendingPlay = false;
            _playBuffer();
        }
    });
}

export function initAudioUnlock() {
    ['click', 'keydown', 'touchstart', 'touchend'].forEach(e =>
        document.addEventListener(e, _onFirstInteraction, { capture: true, passive: true })
    );
}

// ── Internal playback ─────────────────────────────────────────────────────────
function _playBuffer() {
    if (!_audioBuffer) {
        console.warn('[IPLSound] Buffer not ready yet');
        return;
    }
    const source = _audioContext.createBufferSource();
    source.buffer = _audioBuffer;
    source.connect(_audioContext.destination);
    source.start(0);
    console.log('[IPLSound] 🔊 Sound played!');
}

// ── Public API ────────────────────────────────────────────────────────────────
/**
 * Play the IPL notification sound.
 * - If AudioContext is running → plays immediately
 * - If AudioContext is suspended (no user gesture yet) → queued, plays on next interaction
 */
export function playIPLSound() {
    console.log('[IPLSound] playIPLSound() — ctx state:', _audioContext.state, '| buffer ready:', !!_audioBuffer);

    if (_audioContext.state === 'running') {
        _playBuffer();
    } else {
        // Suspended — queue it and attempt resume (resume() needs a gesture, but
        // works if the SW message was triggered while the tab was in focus)
        _pendingPlay = true;
        _audioContext.resume().then(() => {
            console.log('[IPLSound] Resume succeeded, playing queued sound');
            if (_pendingPlay) {
                _pendingPlay = false;
                _playBuffer();
            }
        }).catch(() => {
            // Still suspended: will play on next user click via _onFirstInteraction
            console.log('[IPLSound] Resume blocked — will play on next user interaction');
        });
    }
}
