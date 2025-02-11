import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { IPostList } from '@/interfaces/blog/IPost';
import LoadingPostCard from '@/components/loaders/LoadingPostCard';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import PostCard from './PostCard';

interface ComponentProps {
  posts: IPostList[];
  title?: string;
  description?: string;
  loading: boolean;
}

function Arrow({
  disabled,
  left,
  onClick,
}: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabledClass = disabled ? 'arrow--disabled' : '';
  return (
    <button
      type="button"
      onClick={!disabled ? onClick : undefined}
      className={`arrow ${left ? 'arrow--left' : 'arrow--right'} ${disabledClass}`}
    >
      {left ? (
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      ) : (
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
}

export default function PostsList({ posts, loading, title, description }: ComponentProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [perView, setPerView] = useState<number>(3); // Default perView to 3
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Update perView based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setPerView(1); // Show 1 post on small screens
      } else {
        setPerView(3); // Show 3 posts on larger screens
      }
    };

    // Initial check and event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Only initialize the slider when posts are loaded
  useEffect(() => {
    if (!loading && posts.length > 0 && instanceRef.current) {
      instanceRef.current.update(); // Update the Keen Slider
      setLoaded(true); // Mark the slider as loaded
    }
  }, [loading, posts, instanceRef]);

  // Ensure sliderRef is available
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update(); // Update slider if needed
    }
  }, [instanceRef]);

  if (loading) {
    return (
      <div className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {title !== '' && (
            <div className="mx-auto text-left">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h2>
              {description !== '' && <p className="mt-2 text-lg/8 text-gray-600">{description}</p>}
            </div>
          )}

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Show 3 loading cards */}
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingPostCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {title !== '' && (
          <div className="mx-auto text-left">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              {title}
            </h2>
            {description !== '' && <p className="mt-2 text-lg/8 text-gray-600">{description}</p>}
          </div>
        )}

        {/* Keen Slider */}
        <div ref={sliderRef} className="keen-slider">
          {posts.map((post) => (
            <div key={post.id} className="keen-slider__slide">
              <PostCard post={post} />
            </div>
          ))}
        </div>
        {/* Arrows */}
        {loaded && instanceRef.current && (
          <div className="hidden 2xl:flex">
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 3}
            />
          </div>
        )}
        {/* Dots */}
        {loaded && instanceRef.current && (
          <div className="dots">
            {[...Array(instanceRef.current.track.details.slides.length - (perView - 1)).keys()].map(
              (idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`} // Adding an accessible label
                  className={`dot ${currentSlide === idx ? 'active' : ''}`}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

PostsList.defaultProps = {
  title: '',
  description: '',
};

Arrow.defaultProps = {
  left: false,
};
