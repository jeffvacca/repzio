'use strict'

// CC = CODE CHALLENGE
var cc = cc || {};

cc.moreMenuWrap = document.getElementById('more-menu-wrap');
cc.moreMenu = document.getElementById('more-menu');
cc.more = document.getElementById('more');

cc.srchBtnSm = document.getElementById('search-btn-sm');
cc.srchSm = document.getElementById('search-sm');

cc.brgr = document.querySelector('.burger');
cc.brgrNav = document.getElementById('burger-nav');

cc.headerH = document.getElementById('nav').offsetHeight;
cc.topBtn = document.getElementById('btn-top');


cc.menuToggle = function(e){
	e.preventDefault();
	cc.moreMenuWrap.classList.toggle('hidden');
	cc.moreMenu.classList.toggle('pushed');
}
cc.srchToggle = function(e){
	e.preventDefault();
	cc.srchSm.classList.toggle('on');
	cc.brgrNav.classList.remove('on');
}
cc.brgrToggle = function(e){
	e.preventDefault();
	cc.srchSm.classList.remove('on');
	cc.brgrNav.classList.toggle('on');
}
cc.showArrow = function(e){
	let scrlY = window.scrollY;
	scrlY > cc.headerH ? cc.topBtn.classList.add('on') : cc.topBtn.classList.remove('on');
}

cc.intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page
cc.scrollStep = function() {
    if (window.pageYOffset === 0) {
        clearInterval(cc.intervalId);
        cc.topBtn.classList.remove('on');
    }
    window.scroll(0, window.pageYOffset - 50);
}
cc.scrollToTop = function() {
    cc.intervalId = setInterval(cc.scrollStep, 16.66);
}
cc.debounce = function(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
cc.resize = function(){
	cc.brgrNav.classList.remove('on');
	cc.srchSm.classList.remove('on');
	cc.moreMenuWrap.classList.add('hidden');
	cc.moreMenu.classList.add('pushed');
}
cc.listeners = function(){
	cc.more.addEventListener('click', cc.menuToggle);
	cc.srchBtnSm.addEventListener('click', cc.srchToggle);
	cc.brgr.addEventListener('click', cc.brgrToggle);
	window.addEventListener('scroll', cc.debounce(cc.showArrow));
	cc.topBtn.addEventListener('click', cc.scrollToTop);
	window.addEventListener('resize', cc.debounce(cc.resize));
}
cc.initialize = function(){
	cc.listeners();
}
document.addEventListener('DOMContentLoaded', function() {
	cc.initialize();
	$(document).foundation();
});

