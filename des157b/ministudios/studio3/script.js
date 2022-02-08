(() => {
    var myFullpage = new fullpage('#fullpage', {
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:['firstPage', 'secondPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
    
        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: true,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        bigSectionsDestination: null,
    
        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
    
        //Design
        controlArrows: true,
        verticalCentered: true,
        sectionsColor : ['#ccc', '#ccc', '#ccc', '#ccc', '#ccc'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        dropEffect: false,
        dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
        waterEffect: false,
        waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
        cards: false,
        cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},
    
        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
    
        lazyLoading: true,
    
        //events
        // need some tweaking to work with AOS
        // https://github.com/michalsnik/aos/issues/490
        onLeave: function(origin, destination, direction){
            console.log("leave")
            document.querySelector('.section [data-aos]').classList.remove("aos-animate");
        },
        // to make it work with AOS
        afterLoad: function(origin, destination, direction){
            console.log("fully load");
            document.querySelector('.section.active [data-aos]').classList.add("aos-animate");
        },
        afterRender: function(){},
        afterResize: function(width, height){},
        afterReBuild: function(){},
        afterResponsive: function(isResponsive){},
        afterSlideLoad: function(section, origin, destination, direction){
            console.log("after slide load")
            document.querySelector('.slide.active [data-aos]').classList.add("aos-animate");
        },
        onSlideLeave: function(section, origin, destination, direction){
            console.log("after slide leave")
            document.querySelector('.slide [data-aos]').classList.remove("aos-animate");
        },

    });

    AOS.init();
})();