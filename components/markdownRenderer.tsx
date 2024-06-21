// components/MarkdownRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Optional: Import a syntax highlighting theme
import styles from './markdownRenderer.module.css';

interface MarkdownRendererProps {
    content: string;
  }
  
  const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
      <div className={styles.markdown}>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  };
  
  export default MarkdownRenderer;