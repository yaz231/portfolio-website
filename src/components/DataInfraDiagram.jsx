export const DataInfraDiagram = () => (
    <div style={{ background: '#0d1117', borderRadius: '10px', padding: '12px' }}>
        <style>{`
      @keyframes infraFlow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      @keyframes infraFail { 0%,55%{stroke:#30a14e;fill:#0d1117} 60%,80%{stroke:#f78166;fill:#f7816633} 85%,100%{stroke:#30a14e;fill:#0d1117} }
      @keyframes infraFailText { 0%,55%{opacity:0} 60%,80%{opacity:1} 85%,100%{opacity:0} }
      @keyframes infraOkText { 0%,55%{opacity:1} 60%,80%{opacity:0} 85%,100%{opacity:1} }
      @keyframes infraPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
      .infra-p1{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite}
      .infra-p2{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .15s}
      .infra-p3{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .3s}
      .infra-p4{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .45s}
      .infra-p5{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .6s}
      .infra-p6{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .75s}
      .infra-p7{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite}
      .infra-p8{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .3s}
      .infra-p9{stroke-dasharray:5 4;animation:infraFlow 1.6s linear infinite .5s}
      .infra-dag-fail-box{animation:infraFail 4s ease-in-out infinite}
      .infra-fail-mark{opacity:0;animation:infraFailText 4s ease-in-out infinite}
      .infra-ok-mark{opacity:1;animation:infraOkText 4s ease-in-out infinite}
      .infra-sla-pulse{animation:infraPulse 1.8s ease-in-out infinite}
      @media (prefers-reduced-motion: reduce){
        .infra-p1,.infra-p2,.infra-p3,.infra-p4,.infra-p5,.infra-p6,.infra-p7,.infra-p8,.infra-p9,.infra-dag-fail-box,.infra-fail-mark,.infra-ok-mark,.infra-sla-pulse{animation:none}
      }
    `}</style>
        <svg width="100%" viewBox="0 0 480 320">
            <defs>
                <marker id="infra-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
            </defs>

            <text x="240" y="12" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="2">AUTOMATED DATA INFRASTRUCTURE</text>

            {/* Sources */}
            {[
                ['Yes Energy', null, 34],
                ['Amperon', null, 66],
                ['Meteologica', null, 98],
                ['Habitat Energy', null, 130],
                ['Kraken', 'usage · payments', 162],
                ['ERCOT', 'market · costs', 194],
            ].map(([name, sub, y]) => {
                const w = sub ? 106 : 90;
                const cx = 4 + w / 2;
                return (
                    <g key={name}>
                        <rect x="4" y={y} width={w} height={sub ? 28 : 20} rx="4" fill="#161b22" stroke="#58a6ff" strokeWidth="1" />
                        <text x={cx} y={sub ? y + 12 : y + 13} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8b949e">{name}</text>
                        {sub && <text x={cx} y={y + 22} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">{sub}</text>}
                    </g>
                );
            })}

            {/* arrows sources -> DAGs (each source lands on a DAG box left edge; every DAG gets one) */}
            {[
                [94, 44, 47],
                [94, 76, 47],
                [94, 108, 101],
                [94, 140, 101],
                [110, 176, 155],
                [110, 208, 209],
            ].map(([sx, sy, ty], i) => (
                <path key={i} className={`infra-p${i + 1}`} d={`M${sx} ${sy} L140 ${ty}`} fill="none" stroke="#58a6ff" strokeWidth="1" markerEnd="url(#infra-arr)" />
            ))}

            {/* Airflow DAG column */}
            <text x="170" y="26" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#017CEE" letterSpacing="1">AIRFLOW</text>
            {[34, 88, 142, 196].map((y, i) => {
                const centerY = y + 13;
                const labelY = centerY + 3;
                return (
                    <g key={i}>
                        <rect
                            x="140" y={y} width="60" height="26" rx="4" fill="#0d1117"
                            stroke="#30a14e" strokeWidth="1.4"
                            className={i === 1 ? 'infra-dag-fail-box' : undefined}
                        />
                        <text x="170" y={labelY} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8b949e">DAG {i + 1}</text>
                        {i === 1 ? (
                            <>
                                <text className="infra-fail-mark" x="192" y={labelY} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#f78166">✗</text>
                                <text className="infra-ok-mark" x="192" y={labelY} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#30a14e">✓</text>
                            </>
                        ) : (
                            <text x="192" y={labelY} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#30a14e">✓</text>
                        )}
                    </g>
                );
            })}

            {/* DAGs -> S3 */}
            <path d="M200 47 H206 M200 101 H206 M200 155 H206 M200 209 H206 M206 47 V209" fill="none" stroke="#30a14e" strokeWidth="1" strokeOpacity=".6" />
            <path className="infra-p7" d="M206 130 L216 130" fill="none" stroke="#30a14e" strokeWidth="1.2" markerEnd="url(#infra-arr)" />

            {/* S3 Data Lake */}
            <rect x="216" y="110" width="80" height="40" rx="6" fill="#161b22" stroke="#ffa657" strokeWidth="1.2" />
            <text x="256" y="126" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657">S3 Data</text>
            <text x="256" y="139" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657">Lake</text>

            {/* S3 -> dbt */}
            <path className="infra-p8" d="M296 130 L330 130" fill="none" stroke="#ffa657" strokeWidth="1.2" markerEnd="url(#infra-arr)" />

            {/* dbt */}
            <rect x="330" y="110" width="56" height="40" rx="6" fill="#161b22" stroke="#f78166" strokeWidth="1.2" />
            <text x="358" y="134" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#f78166">dbt</text>

            {/* dbt -> output */}
            <path className="infra-p9" d="M358 150 L360 200" fill="none" stroke="#f78166" strokeWidth="1.2" markerEnd="url(#infra-arr)" />

            {/* Output */}
            <rect x="300" y="200" width="120" height="46" rx="8" fill="#0d1117" stroke="#d2a8ff" strokeWidth="1.5" />
            <text x="360" y="219" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#d2a8ff">Trading</text>
            <text x="360" y="232" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#d2a8ff">Decisions</text>

            {/* SLA monitor */}
            <g className="infra-sla-pulse">
                <rect x="4" y="234" width="140" height="34" rx="6" fill="#161b22" stroke="#30a14e" strokeWidth="1" />
                <text x="74" y="248" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#30a14e">✓ SLA / Freshness</text>
                <text x="74" y="261" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">all pipelines on time</text>
            </g>

            {/* Badge */}
            <rect x="130" y="270" width="220" height="26" rx="6" fill="#161b22" stroke="#58a6ff" strokeWidth="0.8" />
            <text x="240" y="287" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#58a6ff">10+ pipelines · millions of events/day</text>
        </svg>
    </div>
);
