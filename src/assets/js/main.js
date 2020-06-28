
import SweetScroll from "sweet-scroll";
import { loading } from './partial/loading';
import { scrollAction } from './partial/scrollAction';
import { scrollTop } from './partial/scrollTop';
import { movie } from './partial/movie';
import { clearModalContent } from './partial/clearModalContent';

window.dataLayer = window.dataLayer || [];


document.addEventListener("DOMContentLoaded", function(){
  loading([
    scrollAction,
    scrollTop,
    movie,
    clearModalContent
  ]);
});


const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']"
});
