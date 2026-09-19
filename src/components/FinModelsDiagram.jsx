export const FinModelsDiagram = () => (
    <div style={{ background: '#0d1117', borderRadius: '10px', padding: '12px' }}>
        <style>{`
      @keyframes finFlow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      @keyframes finVal1 { 0%,22%{opacity:1} 28%,100%{opacity:0} }
      @keyframes finVal2 { 0%,22%{opacity:0} 28%,48%{opacity:1} 54%,100%{opacity:0} }
      @keyframes finVal3 { 0%,48%{opacity:0} 54%,100%{opacity:1} }
      .fin-e1{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite}
      .fin-e2{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .2s}
      .fin-e3{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .4s}
      .fin-e4{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .1s}
      .fin-e5{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .3s}
      .fin-e6{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .5s}
      .fin-e7{stroke-dasharray:5 4;animation:finFlow 1.8s linear infinite .25s}
      .fin-val1{opacity:0;animation:finVal1 3.5s ease-in-out infinite}
      .fin-val2{opacity:0;animation:finVal2 3.5s ease-in-out infinite}
      .fin-val3{opacity:1;animation:finVal3 3.5s ease-in-out infinite}
      @media (prefers-reduced-motion: reduce){
        .fin-e1,.fin-e2,.fin-e3,.fin-e4,.fin-e5,.fin-e6,.fin-e7,.fin-val1,.fin-val2,.fin-val3{animation:none}
      }
    `}</style>
        <svg width="100%" viewBox="0 0 480 320">
            <defs>
                <marker id="fin-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
            </defs>

            <text x="240" y="16" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="2">FINANCIAL DATA MODELS</text>

            {/* Column headers */}
            <text x="45" y="34" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">SOURCES</text>
            <text x="150" y="34" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">STAGING</text>
            <text x="255" y="34" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">INTERMEDIATE</text>
            <text x="390" y="34" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">MARTS</text>

            {/* Sources: "Transactional DB" = 17 chars * 9 * 0.6 = 91.8, box width 100 (>=4px padding each side) */}
            {['Transactional DB', 'API Logs', 'Ops Systems'].map((name, i) => (
                <rect key={name} x="4" y={44 + i * 40} width="100" height="26" rx="4" fill="#161b22" stroke="#58a6ff" strokeWidth="1" />
            ))}
            {['Transactional DB', 'API Logs', 'Ops Systems'].map((name, i) => (
                <text key={name} x="54" y={61 + i * 40} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8b949e">{name}</text>
            ))}

            {/* Staging */}
            {[0, 1, 2].map((i) => (
                <rect key={i} x="120" y={44 + i * 40} width="60" height="26" rx="4" fill="#0d1117" stroke="#30a14e" strokeWidth="1.2" />
            ))}
            {[0, 1, 2].map((i) => (
                <text key={i} x="150" y={61 + i * 40} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#30a14e">stg_{i + 1}</text>
            ))}

            {/* Intermediate */}
            {[0, 1].map((i) => (
                <rect key={i} x="220" y={64 + i * 40} width="70" height="26" rx="4" fill="#0d1117" stroke="#d2a8ff" strokeWidth="1.2" />
            ))}
            {[0, 1].map((i) => (
                <text key={i} x="255" y={81 + i * 40} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#d2a8ff">int_{i + 1}</text>
            ))}

            {/* Marts: "Financial Reporting" = 20 chars * 9 * 0.6 = 108, box width 128 (>=4px padding each side) */}
            {['Financial Reporting', 'Trading', 'Risk'].map((name, i) => (
                <rect key={name} x="326" y={44 + i * 40} width="128" height="26" rx="4" fill="#161b22" stroke="#ffa657" strokeWidth="1.2" />
            ))}
            {['Financial Reporting', 'Trading', 'Risk'].map((name, i) => (
                <text key={name} x="390" y={61 + i * 40} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657">{name}</text>
            ))}

            {/* Edges: sources -> staging */}
            <path className="fin-e1" d="M104 57 L118 57" fill="none" stroke="#58a6ff" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e2" d="M104 97 L118 97" fill="none" stroke="#58a6ff" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e3" d="M104 137 L118 137" fill="none" stroke="#58a6ff" strokeWidth="1" markerEnd="url(#fin-arr)" />

            {/* staging -> intermediate */}
            <path className="fin-e4" d="M180 57 L218 77" fill="none" stroke="#30a14e" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e5" d="M180 97 L218 87" fill="none" stroke="#30a14e" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e6" d="M180 137 L218 117" fill="none" stroke="#30a14e" strokeWidth="1" markerEnd="url(#fin-arr)" />

            {/* intermediate -> marts (each starts on a real node edge: int_1 center 77, int_1 bottom 90, int_2 center 117) */}
            <path className="fin-e7" d="M290 77 L324 57" fill="none" stroke="#d2a8ff" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e7" d="M290 90 L324 97" fill="none" stroke="#d2a8ff" strokeWidth="1" markerEnd="url(#fin-arr)" />
            <path className="fin-e7" d="M290 117 L324 137" fill="none" stroke="#d2a8ff" strokeWidth="1" markerEnd="url(#fin-arr)" />

            {/* Reconciliation readout */}
            <rect x="150" y="200" width="180" height="54" rx="8" fill="#0d1117" stroke="#8b949e" strokeWidth="1.2" />
            <text x="240" y="220" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">RECONCILIATION</text>
            <text className="fin-val1" x="240" y="243" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#f78166">Δ $0.37</text>
            <text className="fin-val2" x="240" y="243" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#ffa657">Δ $0.04</text>
            <text className="fin-val3" x="240" y="243" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#30a14e">Δ $0.00</text>

            {/* Badge */}
            <rect x="150" y="270" width="180" height="26" rx="6" fill="#161b22" stroke="#ffa657" strokeWidth="0.8" />
            <text x="240" y="287" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657">cent-level precision</text>
        </svg>
    </div>
);
