/////// LOGIN/REGISTER ///////

let loginMenu = document.querySelector("header .active");

let loginShow = document.querySelector(".login-container");

let btnClose = document.querySelector("#btn-close");

loginMenu.addEventListener("click", () => {
  loginShow.style.clipPath = `circle(100% at 50% 50%)`;
});

btnClose.addEventListener("click", () => {
  loginShow.style.clipPath = `circle(0 at 50% 50%)`;
});

let btnToggle = document.querySelectorAll(".next-log");

let resForm = document.querySelector("#res");

btnToggle.forEach((item) => {
  item.addEventListener("click", () => {
    resForm.classList.toggle("hidden");
  });
});

/////// RESPONSIVE MENU TOGGLE ///////

let menuToggle = document.querySelectorAll("header .menu");
let menu = document.querySelector("header ul");
menuToggle.forEach((item) => {
  item.addEventListener("click", () => {
    menu.classList.toggle("menu-toggle");
  });
});

/////// BANNER AUTO SLIDE ///////

let banner = document.querySelector(".banner");
let images = document.querySelectorAll(".banner img");
let dots = document.querySelectorAll(".banner .nav-dot");
let prev = document.querySelector(".banner .prev");
let next = document.querySelector(".banner .next");

let slideIndex = 0;
slideShow(slideIndex);
function slideShow(n) {
  if (slideIndex > images.length - 1) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = images.length - 1;
  }
  let i;
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  images[slideIndex].style.display = "block";
  dots[slideIndex].className += " dot-active";
}

dots.forEach((item, index) => {
  item.addEventListener("click", () => {
    slideShow((slideIndex = index));
  });
});

/////// PREV NEXT BUTTON ///////

prev.addEventListener("click", () => {
  slideShow((slideIndex -= 1));
});
next.addEventListener("click", () => {
  slideShow((slideIndex += 1));
});

/////// AUTO SLIDE ///////

let run;
autoSlide();
function autoSlide() {
  run = setInterval(() => {
    slideShow((slideIndex += 1));
  }, 5000);
}

banner.addEventListener("mouseover", () => {
  clearInterval(run);
  run = null;
});
banner.addEventListener("mouseout", () => {
  autoSlide();
});

/////// GOOGLE MAPS API ///////

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const neuschwanstein = { lat: 47.5576, lng: 10.7498 };
  
  // The map, centered at Uluru
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 4,
    center: neuschwanstein,
  });

  addMarker({lat: 47.5576, lng: 10.7498})  //NEUSCHWANSTEIN CASTLE
  addMarker({lat: 45.3600, lng: 25.5426})  //PELEȘ CASTLE
  addMarker({lat: 49.0511, lng: 14.4416})  //HLUBOKÁ CASTLE
  addMarker({lat: 48.6361, lng: 1.5115})  //MONT SAINT MICHEL
  addMarker({lat: 45.7495, lng: 22.8883})  //CORVIN CASTLE
  addMarker({lat: 53.5616, lng: -9.8893}) //KYLEMORE ABBEY
  addMarker({lat: 46.2577, lng: 15.9451})  //TRAKOŠĆAN CASTLE
  addMarker({lat: 46.4142, lng: 6.9275})  //CHILLON CASTLE
  addMarker({lat: 45.7025, lng: 13.7124})  //MIRAMARE CASTLE
  addMarker({lat: 48.7799, lng: 18.5778})  //BOJNICE CASTLE
  addMarker({lat: 48.3236, lng: 8.9674})  //HOHENZOLLERN CASTLE
  addMarker({lat: 47.3249, lng: 1.0703})  //CHATEAU DE CHENONCEAU

  function addMarker(coordinates){
// The marker, positioned at Uluru
const marker = new google.maps.Marker({
  position: coordinates,
  map: map,
});
  }
  
}

/////// TO TOP ARROW ///////

let toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});


/////// SCROLL TEXT LIBRARY ///////

var ScrollOut = (function () {
  'use strict';

  function clamp(v, min, max) {
      return min > v ? min : max < v ? max : v;
  }
  function sign(x) {
      return (+(x > 0) - +(x < 0));
  }
  function round(n) {
      return Math.round(n * 10000) / 10000;
  }

  var cache = {};
  function replacer(match) {
      return '-' + match[0].toLowerCase();
  }
  function hyphenate(value) {
      return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
  }

  /** find elements */
  function $(e, parent) {
      return !e || e.length === 0
          ? // null or empty string returns empty array
              []
          : e.nodeName
              ? // a single element is wrapped in an array
                  [e]
              : // selector and NodeList are converted to Element[]
                  [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
  }
  function setAttrs(el, attrs) {
      // tslint:disable-next-line:forin
      for (var key in attrs) {
          if (key.indexOf('_')) {
              el.setAttribute('data-' + hyphenate(key), attrs[key]);
          }
      }
  }
  function setProps(cssProps) {
      return function (el, props) {
          for (var key in props) {
              if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
                  el.style.setProperty('--' + hyphenate(key), round(props[key]));
              }
          }
      };
  }

  var clearTask;
  var subscribers = [];
  function loop() {
      clearTask = 0;
      subscribers.slice().forEach(function (s2) { return s2(); });
      enqueue();
  }
  function enqueue() {
      if (!clearTask && subscribers.length) {
          clearTask = requestAnimationFrame(loop);
      }
  }
  function subscribe(fn) {
      subscribers.push(fn);
      enqueue();
      return function () {
          subscribers = subscribers.filter(function (s) { return s !== fn; });
          if (!subscribers.length && clearTask) {
              cancelAnimationFrame(clearTask);
              clearTask = 0;
          }
      };
  }

  function unwrap(value, el, ctx, doc) {
      return typeof value === 'function' ? value(el, ctx, doc) : value;
  }
  function noop() { }

  function main (opts) {
      // Apply default options.
      opts = opts || {};
      // Debounce onChange/onHidden/onShown.
      var onChange = opts.onChange || noop;
      var onHidden = opts.onHidden || noop;
      var onShown = opts.onShown || noop;
      var onScroll = opts.onScroll || noop;
      var props = opts.cssProps ? setProps(opts.cssProps) : noop;
      var se = opts.scrollingElement;
      var container = se ? $(se)[0] : window;
      var doc = se ? $(se)[0] : document.documentElement;
      var rootChanged = false;
      var scrollingElementContext = {};
      var elementContextList = [];
      var clientOffsetX, clientOffsety;
      var sub;
      function index() {
          elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) { return ({ element: el }); });
      }
      function update() {
          // Calculate position, direction and ratio.
          var clientWidth = doc.clientWidth;
          var clientHeight = doc.clientHeight;
          var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
          var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
          var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
          var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1);
          // Detect if the root context has changed.
          rootChanged =
              rootChanged ||
                  scrollingElementContext.scrollDirX !== scrollDirX ||
                  scrollingElementContext.scrollDirY !== scrollDirY ||
                  scrollingElementContext.scrollPercentX !== scrollPercentX ||
                  scrollingElementContext.scrollPercentY !== scrollPercentY;
          scrollingElementContext.scrollDirX = scrollDirX;
          scrollingElementContext.scrollDirY = scrollDirY;
          scrollingElementContext.scrollPercentX = scrollPercentX;
          scrollingElementContext.scrollPercentY = scrollPercentY;
          var childChanged = false;
          for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
              var ctx = elementContextList[index_1];
              var element = ctx.element;
              // find the distance from the element to the scrolling container
              var target = element;
              var offsetX = 0;
              var offsetY = 0;
              do {
                  offsetX += target.offsetLeft;
                  offsetY += target.offsetTop;
                  target = target.offsetParent;
              } while (target && target !== container);
              // Get element dimensions.
              var elementHeight = element.clientHeight || element.offsetHeight || 0;
              var elementWidth = element.clientWidth || element.offsetWidth || 0;
              // Find visible ratios for each element.
              var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) -
                  clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) /
                  elementWidth;
              var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) -
                  clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) /
                  elementHeight;
              var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
              var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
              var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
              var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
              var visible = void 0;
              if (opts.offset) {
                  visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
              }
              else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
                  visible = 1;
              }
              else {
                  visible = 0;
              }
              var changedVisible = ctx.visible !== visible;
              var changed = ctx._changed ||
                  changedVisible ||
                  ctx.visibleX !== visibleX ||
                  ctx.visibleY !== visibleY ||
                  ctx.index !== index_1 ||
                  ctx.elementHeight !== elementHeight ||
                  ctx.elementWidth !== elementWidth ||
                  ctx.offsetX !== offsetX ||
                  ctx.offsetY !== offsetY ||
                  ctx.intersectX !== ctx.intersectX ||
                  ctx.intersectY !== ctx.intersectY ||
                  ctx.viewportX !== viewportX ||
                  ctx.viewportY !== viewportY;
              if (changed) {
                  childChanged = true;
                  ctx._changed = true;
                  ctx._visibleChanged = changedVisible;
                  ctx.visible = visible;
                  ctx.elementHeight = elementHeight;
                  ctx.elementWidth = elementWidth;
                  ctx.index = index_1;
                  ctx.offsetX = offsetX;
                  ctx.offsetY = offsetY;
                  ctx.visibleX = visibleX;
                  ctx.visibleY = visibleY;
                  ctx.intersectX = intersectX;
                  ctx.intersectY = intersectY;
                  ctx.viewportX = viewportX;
                  ctx.viewportY = viewportY;
                  ctx.visible = visible;
              }
          }
          if (!sub && (rootChanged || childChanged)) {
              sub = subscribe(render);
          }
      }
      function render() {
          maybeUnsubscribe();
          // Update root attributes if they have changed.
          if (rootChanged) {
              rootChanged = false;
              setAttrs(doc, {
                  scrollDirX: scrollingElementContext.scrollDirX,
                  scrollDirY: scrollingElementContext.scrollDirY
              });
              props(doc, scrollingElementContext);
              onScroll(doc, scrollingElementContext, elementContextList);
          }
          var len = elementContextList.length;
          for (var x = len - 1; x > -1; x--) {
              var ctx = elementContextList[x];
              var el = ctx.element;
              var visible = ctx.visible;
              var justOnce = el.hasAttribute('scrollout-once') || false; // Once
              if (ctx._changed) {
                  ctx._changed = false;
                  props(el, ctx);
              }
              if (ctx._visibleChanged) {
                  setAttrs(el, { scroll: visible ? 'in' : 'out' });
                  onChange(el, ctx, doc);
                  (visible ? onShown : onHidden)(el, ctx, doc);
              }
              // if this is shown multiple times, keep it in the list
              if (visible && (opts.once || justOnce)) { // or if this element just display it once
                  elementContextList.splice(x, 1);
              }
          }
      }
      function maybeUnsubscribe() {
          if (sub) {
              sub();
              sub = undefined;
          }
      }
      // Run initialize index.
      index();
      update();
      render();
      // Collapses sequential updates into a single update.
      var updateTaskId = 0;
      var onUpdate = function () {
          updateTaskId = updateTaskId || setTimeout(function () {
              updateTaskId = 0;
              update();
          }, 0);
      };
      // Hook up document listeners to automatically detect changes.
      window.addEventListener('resize', onUpdate);
      container.addEventListener('scroll', onUpdate);
      return {
          index: index,
          update: update,
          teardown: function () {
              maybeUnsubscribe();
              window.removeEventListener('resize', onUpdate);
              container.removeEventListener('scroll', onUpdate);
          }
      };
  }

  return main;

}());

ScrollOut({
  targets: ".lazy" // here you can pass tags for animation 

  // also you must select which tags to animate in css where are [data-scroll="in"]
 });
