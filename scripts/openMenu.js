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
            overlay.addEventListener('click', openMenu);
        }

    }

    function openMenu() {
        let menu = document.getElementById('menu');
        let overlay = document.querySelector('.overlay');

        menu.classList.toggle('hidden');
        menu.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        overlay.classList.toggle('-translate-x-full');
    }

}());
