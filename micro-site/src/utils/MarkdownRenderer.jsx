import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkDownStyle = styled.div`
  font-size: 1rem;
  line-height: 2.5rem;
`;

export default function MarkdownRenderer({ markdown }) {
  return (
    <MarkDownStyle>
      <ReactMarkdown children={markdown} remarkPlugins={remarkGfm}></ReactMarkdown>
    </MarkDownStyle>
  );
}
