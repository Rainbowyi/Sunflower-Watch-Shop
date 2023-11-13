import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const btn=style({
  backgroundColor:vars.colors.cyan300,
  padding:"15px",
  border:"none",
  borderRadius:"20px",
  fontFamily:"inherit",
  fontSize:"16px",
  fontWeight:vars.fontWeights.bolder,
  cursor:"pointer",
  width:"100vh"
})