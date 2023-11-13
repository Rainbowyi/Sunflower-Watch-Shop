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

export const btn = style({
  backgroundColor:vars.colors.cyan300,
  padding:"15px",
  border:"none",
  borderRadius:"20px",
  fontFamily:"inherit",
  fontSize:"16px",
  fontWeight:vars.fontWeights.bolder,
  cursor:"pointer"
 })
 export const btnLink =style({
margin:"20px"
 })