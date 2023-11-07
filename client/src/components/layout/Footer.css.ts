import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const footer = style({
  color: vars.colors.complementary,
  backgroundColor: vars.colors.primary,
  padding: vars.space['3x'],
  borderTop: `1px solid ${vars.colors.grey300}`,
  textAlign: 'center',
  justifyContent: 'center',
  display: 'flex',
});

export const paragraph = style({
  color: vars.colors.complementary,
  fontSize: vars.fontSizes['2xs'],
  fontWeight: vars.fontWeights.bold,
  padding: vars.space['1x'],
});
export const signup = style({
  marginTop:"6px",
  textDecoration:"none"
})