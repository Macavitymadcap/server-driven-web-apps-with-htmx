interface QuoteProps {
  text: string;
  author: string;
}

export const Quote = ({ text: quote, author }: QuoteProps) => {
  return (
    <>
      <blockquote>{quote}</blockquote>
      <cite>{author}</cite>
    </>
  );
};
