(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', initialiser);

    function initialiser() {
        let rangeSlider = document.querySelector('.range-slider');
        let rangeValue = document.querySelector('.range-value');
        let rangeBar = document.querySelector('.range-bar');
        let passwordInput = document.querySelector('.password-input');
        let rangeBarWidth = window.getComputedStyle(rangeBar).width; // width du rangeBar
        let actualBarWidth = parseInt(rangeBarWidth, 10); // convertir width du rangeBar
        let form = document.querySelector('.form-generate');
        let regenerateButton = document.querySelector('.regenerate');
        let copyPassword = document.querySelector('.copyPassword');

        let saveSliderPos = sessionStorage.getItem('rangeSliderPosition');
        if (saveSliderPos > -16 && saveSliderPos < actualBarWidth - 16) {
            rangeSlider.style.left = `${saveSliderPos}px`; // déplacer le slider avec la nouvelle position enregistrer
        }

        let saveRangeWidth = sessionStorage.getItem('rangeValueWidth');
        if (saveRangeWidth > -16 && saveRangeWidth < actualBarWidth - 16) {
            rangeValue.style.width = `${saveRangeWidth}px`; // déplacer le slider avec la largeur du rangeValue enregistré
        }

        let savePasswordLenght = sessionStorage.getItem('passwordLength');
        if (savePasswordLenght) {
            passwordInput.setAttribute('value', savePasswordLenght); // changer la valeur de l'input en fonction de la largeur du rangeValue enregistré
        } else {
            passwordInput.setAttribute('value', 12);
        }

        initResizer(rangeSlider, rangeValue, rangeBar, passwordInput);

        // Copier le mot de passe dans le clipboard
        copyPassword.addEventListener('click', function (evt) {
            evt.preventDefault();
            navigator.clipboard.writeText(document.querySelector('.showPassword').textContent);
            alert('Mot de passe copié dans le clipboard');
        });

        // Générer un nouveau mot de passe lorsque le bouton est cliqué
        regenerateButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            generatePassword();
        });
        
        // Générer le mot de passe lorsque une valeur du formulaire change
        form.addEventListener('change', generatePassword);

        generatePassword();
    }

    function initResizer(rangeSlider, rangeValue, rangeBar, passwordInput) {
        // position actuelle de la souris en x
        let horizontalPosition, actualWidth, actualPos, actualBarWidth;

        // fonction lorsqu'on appuie sur le resizer
        function resizerPressed(evt) {
            horizontalPosition = evt.clientX;
            let rangeValueWidth = window.getComputedStyle(rangeValue).width; // width du rangeValue
            actualWidth = parseInt(rangeValueWidth, 10); // convertir width du rangeValue en nombre

            let rangeSliderPosition = window.getComputedStyle(rangeSlider).left; // position du slider
            actualPos = parseInt(rangeSliderPosition, 10); // convertir position du slider en nombre

            let rangeBarWidth = window.getComputedStyle(rangeBar).width; // width du rangeBar
            actualBarWidth = parseInt(rangeBarWidth, 10); // convertir width du rangeBar

            document.addEventListener("mousemove", resizerMove);
            document.addEventListener("mouseup", resizerLeave);
            document.addEventListener("mouseup", resizerLeave);
            document.addEventListener("touchend", resizerLeave);
        }

        function resizerMove(evt) {
            let distanceSouris = evt.clientX - horizontalPosition; // distance de la souris par rapport à la position initiale
            let newWidth = actualWidth + distanceSouris; // largeur complète
            let newPos = actualPos + distanceSouris; // nouvelle position du slider

            if (newWidth > 0 && newWidth < actualBarWidth) {
                rangeValue.style.width = `${newWidth}px`;
            }

            if (newPos > -16 && newPos < actualBarWidth - 16) {
                rangeSlider.style.left = `${newPos}px`; // déplacer le slider avec la nouvelle largeur du rangeValue
                generatePassword();
            }

            // changer value input en fonction de la largeur du rangeValue entre 8 et 24
            let passwordLength = Math.floor((newWidth / actualBarWidth) * (24 - 8)) + 8;
            passwordLength = Math.max(8, Math.min(24, passwordLength)); // s'assurer que la longueur est entre 8 et 24
            passwordInput.setAttribute('value', passwordLength); // changer la valeur de l'input en fonction de la largeur du rangeValue

            // sauvegarder la largeur du rangeValue et du rangeSlider dans le sessionStorage
            sessionStorage.setItem('rangeSliderPosition', newPos);
            sessionStorage.setItem('rangeValueWidth', newWidth);
            sessionStorage.setItem('passwordLength', passwordLength);
            
        }

        function resizerLeave() {
            // remove event mousemove && mouseup
            document.removeEventListener("mouseup", resizerLeave);
            document.removeEventListener("mousemove", resizerMove);
            document.removeEventListener("touchend", resizerLeave);
            document.removeEventListener("touchmove", resizerMove);
        }

        rangeSlider.addEventListener("mousedown", resizerPressed);
        rangeSlider.addEventListener("touchstart", resizerPressed);
    }

    function generatePassword() {
        let lengthPassword = document.querySelector('.password-input').value;
        let majInput = document.getElementById('majInput').checked;
        let chiffreInput = document.getElementById('nbInput').checked;
        let symboleInput = document.getElementById('symbInput').checked;
        let showPassword = document.querySelector('.showPassword');

        let uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lowercaseLetters = uppercaseLetters.toLowerCase();
        let numbers = '0123456789';
        let specialCharacters = '!@#$%^&*()-_=+[{]};:\'",<.>/?';
        let allCharacters = lowercaseLetters;

        if (majInput) allCharacters += uppercaseLetters;
        if (chiffreInput) allCharacters += numbers;
        if (symboleInput) allCharacters += specialCharacters;

        let password = '';
        for (let i = 0; i < lengthPassword; i++) {
            let randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }

        showPassword.textContent = password;
    }
}());
