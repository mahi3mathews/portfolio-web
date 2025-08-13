import type { ReactElement } from 'react';

type CarouselProps = {
  content: { content: ReactElement }[];
};

export function Carousel({ content }: CarouselProps) {
  return (
    <div>
      {content.map((item, index) => {
        return <div key={`carousel-${index}`}></div>;
      })}
    </div>
  );
}
