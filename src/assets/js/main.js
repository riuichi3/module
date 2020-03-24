
import {      test } from './partial/test';
import { loading } from './partial/loading';
import SweetScroll from "sweet-scroll";
import './partial/scrollAction';
// test();
const a = function(){console.log(0)}
const b = function(){console.log(1)}
const c = function(){console.log(2)}
loading([a,b,c]);

const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']"
});
