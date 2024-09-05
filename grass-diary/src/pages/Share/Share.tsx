import { useEffect, useRef } from 'react';
import { Feed, PopularFeed } from '@components/index';
import { useLatestDiaries } from '@hooks/api/useLatestDiaries';
import { NULL } from '@constants/message';
import styled from 'styled-components';
import { semantic } from '@styles/semantic';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { TYPO } from '@styles/typo';

const Share = () => {
  const target = useRef<HTMLDivElement>(null);
  const { latest, fetchNextPage } = useLatestDiaries();

  const callback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      fetchNextPage();
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (latest?.length === 0) {
      window.scrollTo(0, 0);
    }
    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    const { current } = target;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latest]);

  return (
    <>
      <PopularFeed />
      <Background>
        <FeedContainer>
          <LatestFeedTitle>공개 일기 피드</LatestFeedTitle>
          {latest ? (
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 960: 2 }}>
              <Masonry columnsCount={2}>
                {latest.map(page =>
                  page?.map(data => {
                    return (
                      <Feed key={data.diaryId} feed={data} isTop={false} />
                    );
                  }),
                )}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <FeedNull>{NULL.share_feed}</FeedNull>
          )}
        </FeedContainer>
        <Observe ref={target} />
      </Background>
    </>
  );
};

export default Share;

const LatestFeedTitle = styled.h3`
  display: none;
  @media screen and (max-width: 60em) {
    display: block;
    color: ${semantic.light.object.transparent.neutral};
    text-align: center;
    ${TYPO.title1}
  }
`;

const FeedNull = styled.div`
  width: 100%;
  height: 10rem;
  text-align: center;
  line-height: 10rem;
`;

const Background = styled.section`
  background: ${semantic.light.bg.solid.subtler};
`;

const FeedContainer = styled.div`
  display: flex;
  max-width: var(--vw-desktop-min, 60rem);
  min-width: 20em;
  padding: var(--gap-7xl, 4.5rem) var(--gap-md, 1.5rem);
  flex-direction: column;
  gap: var(--gap-2xl, 2rem);
  align-self: stretch;

  margin: auto;
`;

const Observe = styled.div`
  width: 100%;
  height: 5rem;
`;
