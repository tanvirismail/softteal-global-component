import { m } from 'framer-motion';
// @mui
import { Box, Paper } from '@mui/material';
// components
import { MotionContainer } from '@/_global/components/animate';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

const TEXT = 'Minimals';

const IMG = [
  'https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/feeds/feed_2.jpg',
  'https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/feeds/feed_3.jpg',
  'https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/feeds/feed_4.jpg',
  'https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/feeds/feed_5.jpg',
  'https://minimal-assets-api-dev.vercel.app/global-assets/assets/images/feeds/feed_8.jpg',
];

type ContainerViewProps = {
  isText: boolean;
  isMulti: boolean;
  selectVariant: string;
};

export default function ContainerView({
  isText,
  isMulti,
  selectVariant,
  ...other
}: ContainerViewProps) {
  const items = isMulti ? IMG : IMG.slice(0, 1);

  return (
    <Paper
      sx={{
        p: 3,
        minHeight: 480,
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.neutral',
      }}
      {...other}
    >
      {isText ? (
        <MotionContainer
          component={m.h1}
          sx={{ typography: 'h1', display: 'flex', overflow: 'hidden' }}
        >
          {TEXT.split('').map((letter, index) => (
            <m.span key={index} variants={getVariant(selectVariant)}>
              {letter}
            </m.span>
          ))}
        </MotionContainer>
      ) : (
        <MotionContainer>
          {items.map((row, index) => (
            <Box
              key={index}
              component={m.img}
              src={row}
              variants={getVariant(selectVariant)}
              sx={{
                my: 2,
                width: 480,
                borderRadius: 1,
                objectFit: 'cover',
                height: isMulti ? 72 : 320,
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            />
          ))}
        </MotionContainer>
      )}
    </Paper>
  );
}
