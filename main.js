'use strict';

window.onload = function () {
    const menuButtonNode = document.querySelector('.header__wrapper-menu');
    let headerNode = document.querySelector('.header');
    let mainNode = document.querySelector('content');
    const footerNode = document.querySelector('.footer');
    const screenHeight = window.screen.height;

    if(menuButtonNode) {
        menuButtonNode.addEventListener('click', function (evt) {
            evt.preventDefault();
            this.classList.toggle('open-menu');
        });
    }

    if(!headerNode) headerNode = 0;
    if(!mainNode) mainNode = 0;

    function getPageHeight(header, main, footer, screen) {
        const emptyHeight = screen - ((header.scrollHeight || 0) + (main.scrollHeight || 0 ));

        if(emptyHeight > footer.scrollHeight) {
            footer.classList.add('footer--fixed');
        }
    }

    getPageHeight(headerNode, mainNode, footerNode, screenHeight);
};
