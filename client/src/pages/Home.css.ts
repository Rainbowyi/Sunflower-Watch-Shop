import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../styles/themes.css';

export const pic = style({
  position:"relative",
  display:"flex",
  flexDirection:"row",
  width:"50%",
  
})
export const title = style({
  position:"absolute",
  display:"flex",
  flexDirection:"column",
  right:"20%",
  top:"50%"
 
})