export const VoCDiagram = () => (
    <div style={{ background: '#0d1117', borderRadius: '10px', padding: '12px' }}>
        <style>{`
      @keyframes vocFlow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      @keyframes vocPulse { 0%,100%{opacity:.7} 50%{opacity:1} }
      @keyframes vocShimmer { 0%,100%{opacity:.5} 50%{opacity:1} }
      .vp1{stroke-dasharray:6 4;animation:vocFlow 1.8s linear infinite}
      .vp2{stroke-dasharray:6 4;animation:vocFlow 1.8s linear infinite .4s}
      .vp3{stroke-dasharray:6 4;animation:vocFlow 1.8s linear infinite .2s}
      .vp4{stroke-dasharray:6 4;animation:vocFlow 1.8s linear infinite .6s}
      .vp5{stroke-dasharray:6 4;animation:vocFlow 1.8s linear infinite .1s}
      .gem-pulse{animation:vocPulse 2s ease-in-out infinite}
      .out-shimmer{animation:vocShimmer 2.5s ease-in-out infinite}
    `}</style>
        <svg width="100%" viewBox="0 0 680 340">
            <defs>
                <marker id="voc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
                <filter id="voc-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            <text x="340" y="24" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#6e7681" letterSpacing="3">VOICE OF CUSTOMER PIPELINE</text>

            {/* Call Transcripts */}
            <g filter="url(#voc-glow)">
                <rect x="40" y="60" width="110" height="56" rx="8" fill="#0d1117" stroke="#30a14e" strokeWidth="1.2" />
                <text x="95" y="83" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#30a14e">📞</text>
                <text x="95" y="101" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#8b949e">Call Transcripts</text>
            </g>

            {/* Emails */}
            <g filter="url(#voc-glow)">
                <rect x="40" y="148" width="110" height="56" rx="8" fill="#0d1117" stroke="#30a14e" strokeWidth="1.2" />
                <text x="95" y="171" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#30a14e">✉️</text>
                <text x="95" y="189" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#8b949e">Emails</text>
            </g>

            <rect x="52" y="222" width="86" height="18" rx="4" fill="#161b22" stroke="#30a14e" strokeWidth="0.5" />
            <text x="95" y="235" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#30a14e">~hundreds/week</text>

            {/* Ingestion */}
            <g filter="url(#voc-glow)">
                <rect x="220" y="90" width="120" height="80" rx="10" fill="#0d1117" stroke="#58a6ff" strokeWidth="1.5" />
                <text x="280" y="120" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#58a6ff" letterSpacing="1">INGEST</text>
                <text x="280" y="138" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">Structured</text>
                <text x="280" y="151" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">LLM Workflow</text>
            </g>

            {/* Custom Prompt */}
            <g>
                <rect x="222" y="242" width="116" height="44" rx="8" fill="#161b22" stroke="#d2a8ff" strokeWidth="1" strokeDasharray="4 2" />
                <text x="280" y="261" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#d2a8ff">⚙️ Custom Prompt</text>
                <text x="280" y="277" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">Injected Context</text>
            </g>

            {/* Gemini */}
            <g className="gem-pulse" filter="url(#voc-glow)">
                <rect x="410" y="80" width="120" height="100" rx="12" fill="#0d1117" stroke="#f78166" strokeWidth="2" />
                <text x="470" y="112" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="#f78166">✦</text>
                <text x="470" y="135" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#f78166" letterSpacing="2">GEMINI</text>
                <text x="470" y="152" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">API</text>
            </g>

            {/* PDF Report */}
            <g className="out-shimmer" filter="url(#voc-glow)">
                <rect x="568" y="60" width="95" height="140" rx="10" fill="#0d1117" stroke="#ffa657" strokeWidth="1.5" />
                <text x="615" y="96" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="#ffa657">📄</text>
                <text x="615" y="118" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#ffa657">PDF</text>
                <text x="615" y="133" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#ffa657">REPORT</text>
                <line x1="576" y1="145" x2="654" y2="145" stroke="#ffa657" strokeOpacity=".2" strokeWidth="0.5" />
                <text x="615" y="158" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">Pain Points</text>
                <text x="615" y="171" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">Successes</text>
                <text x="615" y="184" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">Stats + Graphs</text>
            </g>

            <rect x="562" y="218" width="107" height="28" rx="6" fill="#161b22" stroke="#ffa657" strokeWidth="0.8" />
            <text x="615" y="236" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657">⚡ 83 hrs saved/wk</text>

            {/* Arrows */}
            <path className="vp1" d="M151 88 L218 120" fill="none" stroke="#30a14e" strokeWidth="1.2" markerEnd="url(#voc-arr)" />
            <path className="vp2" d="M151 176 L218 142" fill="none" stroke="#30a14e" strokeWidth="1.2" markerEnd="url(#voc-arr)" />
            <path className="vp3" d="M340 130 L408 130" fill="none" stroke="#58a6ff" strokeWidth="1.5" markerEnd="url(#voc-arr)" />
            <path className="vp4" d="M280 242 L280 172" fill="none" stroke="#d2a8ff" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#voc-arr)" />
            <path className="vp5" d="M530 130 L566 130" fill="none" stroke="#f78166" strokeWidth="1.5" markerEnd="url(#voc-arr)" />

            <text x="183" y="103" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">ingest</text>
            <text x="374" y="122" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">process</text>
            <text x="548" y="122" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6e7681">generate</text>
        </svg>
    </div>
);