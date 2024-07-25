(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", initialiser);

    function initialiser() {
        let currentYear = new Date().getFullYear();
        document.getElementById('current-year').textContent = currentYear;
    }
}());
