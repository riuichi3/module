import SweetScroll from "sweet-scroll";
import { loading } from "./partial/loading";
import { scrollAction } from "./partial/scrollAction";
import { scrollTop } from "./partial/scrollTop";
import { movie } from "./partial/movie";
import { clearModalContent } from "./partial/clearModalContent";
import { barrage } from "./partial/barrage";
import { mouseCursol } from "./partial/mouseCursol";

window.dataLayer = window.dataLayer || [];

document.addEventListener("DOMContentLoaded", function () {
  loading([scrollAction]);
  scrollTop();
  movie();
  clearModalContent();
  mouseCursol();
});

const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']",
});
