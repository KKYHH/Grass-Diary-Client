import stylex from '@stylexjs/stylex';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { Feed } from '@components/index';
import { usePopularDiaries } from '@hooks/api/usePopularDiaries';
import { NULL } from '@constants/message';

const styles = stylex.create({
  slider: {
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  noFeed: {
    height: '400px',
    textAlign: 'center',
    lineHeight: '400px',
  },
});

const PopularFeed = () => {
  const { data: top10 } = usePopularDiaries();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const feedList = top10?.map(data => (
    <Feed
      key={data.diaryId}
      likeCount={data.diaryLikeCount}
      link={`/diary/${data.diaryId}`}
      createdAt={data.createdAt}
      content={data.content}
      name={data.nickname}
      memberId={data.memberId}
    />
  ));

  return (
    <div className="slider-container" {...stylex.props(styles.slider)}>
      {top10 && top10.length > 3 ? (
        <Slider {...settings}>{feedList}</Slider>
      ) : (
        feedList
      )}
      {top10 && !top10.length ? (
        <div {...stylex.props(styles.noFeed)}>{NULL.SHARE_POPULAR_FEED}</div>
      ) : null}
    </div>
  );
};

export default PopularFeed;
