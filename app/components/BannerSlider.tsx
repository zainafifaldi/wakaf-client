import { useState } from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (dots) => (
    <Box
      sx={{
        bottom: '12px !important',
      }}
    >
      {dots}
    </Box>
  ),
};

interface Banner {
  image_url: string;
}

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  return (
    <Box
      pos='relative'
      height='400px'
      width='full'
      overflow='hidden'
    >
      {/* CSS files for react-slick */}
      <link
        rel='stylesheet'
        type='text/css'
        charSet='UTF-8'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      />
      <link
        rel='stylesheet'
        type='text/css'
        href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      />
      {/* Left Icon */}
      <IconButton
        aria-label='left-arrow'
        variant='ghost'
        pos='absolute'
        left={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex='1'
        onClick={() => slider?.slickPrev()}>
        <ArrowBackIcon />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label='right-arrow'
        variant='ghost'
        pos='absolute'
        right={side}
        top={top}
        transform='translate(0%, -50%)'
        zIndex='1'
        onClick={() => slider?.slickNext()}>
        <ArrowForwardIcon />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {banners.map((banner, index) => (
          <Box
            key={index}
            height='400px'
            pos='relative'
            backgroundPosition='top center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
            backgroundImage={`url(${banner.image_url})`}
          />
        ))}
      </Slider>
    </Box>
  );
}
