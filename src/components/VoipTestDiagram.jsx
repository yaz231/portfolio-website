export const VoipTestDiagram = () => (
    <div style={{ background: '#0d1117', borderRadius: '10px', padding: '12px' }}>
        <style>{`
      @keyframes voipFlow { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      @keyframes voipTile0 { 0%,4%,100%{fill:#161b22;stroke:#6e7681} 8%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipTile1 { 0%,17%{fill:#161b22;stroke:#6e7681} 21%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipTile2 { 0%,30%{fill:#161b22;stroke:#6e7681} 34%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipTile3 { 0%,43%{fill:#161b22;stroke:#6e7681} 47%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipTile4 { 0%,56%{fill:#161b22;stroke:#6e7681} 60%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipTile5 { 0%,69%{fill:#161b22;stroke:#6e7681} 73%,92%{fill:#0d1117;stroke:#30a14e} }
      @keyframes voipBarGrow { 0%{transform:scaleX(0)} 60%,100%{transform:scaleX(1)} }
      .voip-t0{animation:voipTile0 4.5s ease-in-out infinite}
      .voip-t1{animation:voipTile1 4.5s ease-in-out infinite}
      .voip-t2{animation:voipTile2 4.5s ease-in-out infinite}
      .voip-t3{animation:voipTile3 4.5s ease-in-out infinite}
      .voip-t4{animation:voipTile4 4.5s ease-in-out infinite}
      .voip-t5{animation:voipTile5 4.5s ease-in-out infinite}
      .voip-e1{stroke-dasharray:5 4;animation:voipFlow 1.6s linear infinite}
      .voip-e2{stroke-dasharray:5 4;animation:voipFlow 1.6s linear infinite .3s}
      .voip-bar{transform-box:fill-box;transform-origin:left;animation:voipBarGrow 2.4s ease-out infinite}
      .voip-sip{stroke-dasharray:3 3;animation:voipFlow 1.8s linear infinite}
      @media (prefers-reduced-motion: reduce){
        .voip-t0,.voip-t1,.voip-t2,.voip-t3,.voip-t4,.voip-t5,.voip-e1,.voip-e2,.voip-bar,.voip-sip{animation:none}
        .voip-t0,.voip-t1,.voip-t2,.voip-t3,.voip-t4,.voip-t5{fill:#0d1117;stroke:#30a14e}
      }
    `}</style>
        <svg width="100%" viewBox="0 0 480 290">
            <defs>
                <marker id="voip-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
            </defs>

            <text x="240" y="16" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="2">AUTOMATED VOIP TEST SUITE</text>

            {/* Jenkins */}
            <rect x="4" y="40" width="80" height="40" rx="6" fill="#161b22" stroke="#D24939" strokeWidth="1.2" />
            <text x="44" y="56" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#D24939">Jenkins</text>
            <text x="44" y="69" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">trigger</text>

            <path className="voip-e1" d="M84 60 L112 60" fill="none" stroke="#D24939" strokeWidth="1.2" markerEnd="url(#voip-arr)" />

            {/* Python runner */}
            <rect x="114" y="40" width="90" height="40" rx="6" fill="#0d1117" stroke="#3776AB" strokeWidth="1.2" />
            <text x="159" y="56" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3776AB">Python</text>
            <text x="159" y="69" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681">test runner</text>

            <path className="voip-e2" d="M204 60 L232 60" fill="none" stroke="#3776AB" strokeWidth="1.2" markerEnd="url(#voip-arr)" />

            {/* Device grid */}
            <text x="336" y="34" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#6e7681" letterSpacing="1">DEVICES UNDER TEST</text>
            {[
                ['IP Phone', 0], ['Webex', 1], ['IP Phone', 2],
                ['Webex', 3], ['IP Phone', 4], ['Webex', 5],
            ].map(([label, i]) => (
                <g key={i}>
                    <rect
                        className={`voip-t${i}`}
                        x={236 + (i % 3) * 68} y={40 + Math.floor(i / 3) * 40}
                        width="60" height="30" rx="5" fill="#161b22" stroke="#6e7681" strokeWidth="1.2"
                    />
                    <text x={266 + (i % 3) * 68} y={59 + Math.floor(i / 3) * 40} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8b949e">{label}</text>
                </g>
            ))}

            {/* SIP ladder, corner */}
            <rect x="4" y="100" width="118" height="110" rx="6" fill="#161b22" stroke="#58a6ff" strokeWidth="1" />
            <text x="63" y="111"textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#58a6ff" letterSpacing="1">SIP</text>
            <line x1="24" y1="122" x2="24" y2="198" stroke="#6e7681" strokeWidth="0.8" />
            <line x1="102" y1="122" x2="102" y2="198" stroke="#6e7681" strokeWidth="0.8" />
            {['INVITE', '180 Ringing', '200 OK', 'RTP'].map((label, i) => (
                <g key={label}>
                    <path className="voip-sip" d={i % 2 === 0 ? `M24 ${130 + i * 22} L102 ${130 + i * 22}` : `M102 ${130 + i * 22} L24 ${130 + i * 22}`} fill="none" stroke="#58a6ff" strokeWidth="1" markerEnd="url(#voip-arr)" />
                    <text x="63" y={122 + i * 22} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8b949e">{label}</text>
                </g>
            ))}

            {/* Before/After bar */}
            <rect x="150" y="140" width="250" height="90" rx="8" fill="#0d1117" stroke="#ffa657" strokeWidth="1.2" />
            <text x="275" y="158" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#ffa657" letterSpacing="1">PER RELEASE CYCLE</text>

            <text x="163" y="180" fontFamily="monospace" fontSize="9" fill="#6e7681">before</text>
            <rect x="210" y="171" width="150" height="14" rx="3" fill="#f78166" opacity="0.85" />
            <text x="368" y="182" fontFamily="monospace" fontSize="9" fill="#f78166">15h</text>

            <text x="163" y="204" fontFamily="monospace" fontSize="9" fill="#6e7681">after</text>
            {/* after bar = 2/15 of the 150px before bar = 20px, with a real width so reduced-motion shows it correctly */}
            <rect className="voip-bar" x="210" y="195" width="20" height="14" rx="3" fill="#30a14e" />
            <text x="368" y="206" fontFamily="monospace" fontSize="9" fill="#30a14e">2h</text>

            {/* Badge */}
            <rect x="150" y="254" width="250" height="26" rx="6" fill="#161b22" stroke="#3776AB" strokeWidth="0.8" />
            <text x="275" y="271" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3776AB">15h → 2h per release cycle</text>
        </svg>
    </div>
);
