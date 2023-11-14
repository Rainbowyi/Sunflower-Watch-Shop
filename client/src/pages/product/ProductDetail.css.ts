import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const productBox = style({
  display: 'flex',
  flexDirection: 'row',
  margin: `${vars.space['3x']} 0`,
  width: '100%',
});

export const productBoxLeft = style({
  margin: `${vars.space['1x']} 0`,
  height: '100%',
  width: '60%',
});

export const productWindow = style({
  width: '80%',
  aspectRatio: '1 / 1',
  objectFit: 'contain',
  margin: 'auto',
});

export const productBoxRight = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['5x'],
  width: '40%',
  justifyContent: 'space-evenly',
});

export const productHeroContainer = style({
  padding: vars.space['0x'],
  width: '100%',
});
export const btn = style({
  backgroundColor:vars.colors.grey300,
  padding:"15px",
  border:"none",
  borderRadius:"20px",
  fontFamily:"inherit",
  fontSize:"16px",
  fontWeight:vars.fontWeights.bolder,
  cursor:"pointer",
  

})

export const span = style({ 
  fontWeight:vars.fontWeights.bolder,
  marginRight:"10px"
})