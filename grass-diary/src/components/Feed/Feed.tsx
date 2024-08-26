import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useWriterProfile } from '@hooks/api/useWriterProfile';
import { semantic } from '@styles/semantic';
import { ReactComponent as CommentIcon } from '@svg/comment.svg';
import { TYPO } from '@styles/typo';
import EMOJI from '@constants/emoji';
import { ReactComponent as Favorite } from '@svg/favorite.svg';

interface IFeedProps {
  feed: Feed;
  isTop: boolean;
}

const Feed = ({ feed, isTop }: IFeedProps) => {
  const { data: writer } = useWriterProfile(feed.memberId);

  const title =
    `${feed.createdAt.slice(2, 4)}년 ` +
    `${feed.createdAt.slice(5, 7)}월 ` +
    `${feed.createdAt.slice(8, 10)}일`;

  const time = feed.createdAt.slice(11, 16);
  const mood = EMOJI[feed.transparency * 10];

  const extractTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    return doc.body.textContent || '';
  };

  return (
    <>
      <CardContainer $isTop={isTop}>
        <CardHeaderSection>
          <CardUserImg src={writer?.profileImageURL} />
          <CardHeaderWrap>
            <CardHeaderDate>{title}</CardHeaderDate>
            <CardNameWrap>
              {feed.nickname}
              <CardTime>{time}</CardTime>
            </CardNameWrap>
          </CardHeaderWrap>
          <CardEmojiContainer>{mood}</CardEmojiContainer>
        </CardHeaderSection>

        <ContentWrap>
          <Link to={`/diary/${feed.diaryId}`}>
            {/* <ImageContent $isTop={isTop} /> */}
            <CardContent $isTop={isTop}>
              {extractTextFromHTML(feed.content)}
            </CardContent>
          </Link>
        </ContentWrap>

        <CardFooterSection>
          <IconWrap>
            <CommentIcon />
            {feed.commentCount}
          </IconWrap>
          <IconWrap>
            <Favorite
              width={22}
              height={22}
              fill={semantic.light.object.transparent.assistive}
            />
            {feed.diaryLikeCount}
          </IconWrap>
        </CardFooterSection>
      </CardContainer>
    </>
  );
};

export default Feed;

const CardContainer = styled.li<{ $isTop: boolean }>`
  display: flex;
  padding: var(--gap-md, 1rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-xl, 1.5rem);
  width: ${props => (props.$isTop ? `17.7rem` : `27.75rem`)};

  border-radius: var(--radius-md, 1rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.assistive};
  background: ${semantic.light.bg.solid.normal};
  box-shadow: 0rem 0rem 0.0625rem 0rem rgba(0, 0, 0, 0.04),
    0rem 0.125rem 0rem 0rem rgba(0, 0, 0, 0.08);
`;

const CardHeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-sm, 0.75rem);
  align-self: stretch;
`;

const CardUserImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: var(--radius-empty, 2.5rem);
  background: ${semantic.light.fill.transparent.alternative};
  object-fit: cover;
`;

const CardHeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--gap-4xs, 0.25rem);
  flex: 1 0 0;
`;

const CardTime = styled.p`
  color: ${semantic.light.object.transparent.assistive};

  ${TYPO.caption1}
`;

const CardHeaderDate = styled.div`
  color: ${semantic.light.object.transparent.neutral};

  ${TYPO.label1}
`;

const CardNameWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);

  color: ${semantic.light.object.transparent.neutral};
  ${TYPO.label1}
`;

const CardEmojiContainer = styled.div`
  display: flex;
  padding: var(--gap-5xs, 0.125rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: var(--radius-round, 6rem);
  border: var(--stroke-thin, 0.0625rem) solid
    ${semantic.light.border.transparent.assistive};

  background: ${semantic.light.fill.transparent.assistive};
`;

const CardFooterSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-md, 1rem);
  width: 100%;
`;

const CardContent = styled.div<{ $isTop: boolean }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;

  // 이미지 있을 경우
  // -webkit-line-clamp: 3;
  // min-height: 5.25rem;

  // 이미지 없을 경우
  -webkit-line-clamp: 10;
  min-height: ${props => (props.$isTop ? `17.75rem` : `27.75rem`)};

  overflow: hidden;
  color: ${semantic.light.object.solid.normal};
  text-overflow: ellipsis;

  ${TYPO.body2}
`;

const ImageContent = styled.div<{ $isTop: boolean }>`
  height: ${props => (props.$isTop ? `12.5rem` : `22.5rem`)};

  border-radius: var(--radius-sm, 0.75rem);
  margin-bottom: 1rem;
  object-fit: cover;
`;

const ContentWrap = styled.div`
  flex: 1;
  align-self: stretch;
`;

const IconWrap = styled.div`
  display: flex;
  padding: var(--gap-5xs, 0.125rem) var(--gap-empty, 0rem);
  align-items: center;
  gap: var(--gap-2xs, 0.5rem);
  color: ${semantic.light.object.transparent.assistive};
  ${TYPO.label3}
`;
