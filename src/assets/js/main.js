
import {      test } from './partial/test';
import SweetScroll from "sweet-scroll";
import './partial/scrollAction';
test();


const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']"
});
