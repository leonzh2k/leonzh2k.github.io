(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const clouds = document.querySelectorAll('circle');
    const hills = document.querySelectorAll('path');
    const bricks = document.querySelectorAll('rect');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            for (const cloud of clouds) {
                cloud.setAttribute('class', 'switch');
            }
            for (const hill of hills) {
                hill.setAttribute('class', 'switch');
            }
            for (const brick of bricks) {
                if (brick.getAttribute('fill') === '#EA7C7C') {
                    // console.log("true")
                    brick.setAttribute('fill', 'rgb(160, 84, 84)');
                } else {
                    brick.setAttribute('fill', '#919191');
                }
                // brick.setAttribute('class', 'switch');
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            for (const cloud of clouds) {
                cloud.removeAttribute('class');
            }
            for (const hill of hills) {
                hill.removeAttribute('class');
            }
            for (const brick of bricks) {
                if (brick.getAttribute('fill') === 'rgb(160, 84, 84)') {
                    // console.log("true")
                    brick.setAttribute('fill', '#EA7C7C');
                } else {
                    brick.setAttribute('fill', '#CFCFCF');
                }
                // brick.setAttribute('class', 'switch');
            }
            mode = 'dark';
        }
    })
})()