(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', initialiser);

    function initialiser() {
        let buttonsMenu = document.querySelectorAll('.buttonMenu');
        let overlay = document.querySelector('.overlay');

        for (let buttonMenu of buttonsMenu) {
            buttonMenu.addEventListener('click', openMenu);
        }

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

    }

    function openMenu() {
        let menu = document.getElementById('menu');
        let overlay = document.querySelector('.overlay');
        let buttonsMenu = document.querySelectorAll('.buttonMenu');

        menu.classList.remove('-left-full');
        menu.classList.add('left-0');
        overlay.classList.remove('hidden');
        overlay.classList.remove('-left-full');
        overlay.classList.add('left-0');

        //remove function openMenu and add function closeMenu au click
        for (let buttonMenu of buttonsMenu) {
            buttonMenu.removeEventListener('click', openMenu);
            buttonMenu.addEventListener('click', closeMenu);
        }
    }

    function closeMenu() {
        let menu = document.getElementById('menu');
        let overlay = document.querySelector('.overlay');
        let buttonsMenu = document.querySelectorAll('.buttonMenu');

        menu.classList.add('-left-full');
        menu.classList.remove('left-0');
        overlay.classList.add('hidden');
        overlay.classList.add('-lef-full');
        overlay.classList.remove('left-0');

        for (let buttonMenu of buttonsMenu) {
            buttonMenu.removeEventListener('click', closeMenu);
            buttonMenu.addEventListener('click', openMenu);
        }
    }

}());
