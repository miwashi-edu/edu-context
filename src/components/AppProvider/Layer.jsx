import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './AppProvider.module.css';

export default function Layer({ concern, children, noArrow = false }) {
    const isString = typeof children === 'string';

    return (
        <div className={styles.layerContainer}>
            <div className={styles.concernWrapper}>
                <div className={styles.layerLeft}>{concern}</div>
                {!noArrow && <div className={styles.downArrow} />}
            </div>

            <div className={styles.layerArrow} />

            <div className={styles.layerRight}>
                {isString ? (
                    <div className={styles.md}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: (props) => (
                                    <a {...props} target="_blank" rel="noreferrer" />
                                ),
                                code: ({ inline, children, ...props }) =>
                                    inline ? (
                                        <code className={styles.codeInline} {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <pre className={styles.codeBlock}>
                      <code {...props}>{children}</code>
                    </pre>
                                    ),
                            }}
                        >
                            {children}
                        </ReactMarkdown>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}
