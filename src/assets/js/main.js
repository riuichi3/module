
import {      test } from './partial/test';
import { loading } from './partial/loading';
import SweetScroll from "sweet-scroll";
import './partial/scrollAction';
import { scrollAction } from './partial/scrollAction';


// test();
const a = function(){console.log(0)}
const b = function(){console.log(1)}
const c = function(){console.log(2)}



document.addEventListener("DOMContentLoaded", function(){
  loading([a,b,c,scrollAction]);
});


const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']"
});
