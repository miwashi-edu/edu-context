import React, { useId, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './AppProvider.module.css';

export default function Layer({
                                  concern,
                                  children,
                                  noArrow = false,
                                  defaultExpanded = false, // default collapsed (icon only)
                              }) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const panelId = useId();

    const toggle = () => setExpanded((v) => !v);

    return (
        <div className={styles.layerContainer}>
            <div className={styles.concernWrapper}>
                <div className={styles.layerLeft}>{concern}</div>
                {!noArrow && <div className={styles.downArrow} />}
            </div>

            {/* Left arrow becomes a button */}
            <button
                type="button"
                className={styles.layerArrowButton}
                onClick={toggle}
                aria-label={expanded ? 'Collapse details' : 'Expand details'}
                aria-expanded={expanded}
                aria-controls={panelId}
            >
                <span className={expanded ? styles.arrowOpen : styles.arrowClosed} />
            </button>

            {/* Right panel: markdown when expanded; info icon when collapsed */}
            <div
                id={panelId}
                className={expanded ? styles.layerRight : styles.layerRightCollapsed}
            >
                {expanded ? (
                    <div className={styles.md}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
                                code: ({ inline, children, ...props }) =>
                                    inline ? (
                                        <code className={styles.codeInline} {...props}>{children}</code>
                                    ) : (
                                        <pre className={styles.codeBlock}><code {...props}>{children}</code></pre>
                                    ),
                            }}
                        >
                            {typeof children === 'string' ? children : ''}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <button
                        type="button"
                        className={styles.infoIconButton}
                        onClick={toggle}
                        aria-label="Show details"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        title="Show details"
                    >
                        {/* simple info icon (SVG) */}
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
                            <circle cx="12" cy="7.5" r="1.25" fill="currentColor" />
                            <rect x="11" y="10.5" width="2" height="7" rx="1" fill="currentColor" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
