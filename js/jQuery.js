$(window).on("load", function() {

//  VARIABLES
    var mobileBreakpoint = 481;
    var windowWidth = $(window).width(); 
    var scrollTop = window.scrollY;
    var windowIsMobile = windowWidth < mobileBreakpoint;
    var windowIsDesktop = windowWidth > mobileBreakpoint;
    var scrolling = false;    
    var prevScrollPos = 0;
    var hidingMenu;
    var hidingBlurb;

//  FUNCTIONS
    function hideBlurbOnScroll() {
        var scrollPosition = scrollTop;            
        if (window.location.href.indexOf('index') > -1 && scrollPosition >= 2) {
            $('#header-blurb').hide("fade", { direction: "down"}, 100);      
        } else {
            $('#header-blurb').show("fade", { direction: "down"}, 100); 
        }
    }
    function hideShowMenuScroll() {
        var currentScrollPos = scrollTop;     
        if (scrolling === true && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header-nav').hide("fade", { direction: "down"}, 100);
        } else if (scrolling === false && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header-nav').hide("fade", { direction: "down"}, 100); 
        } else if (scrolling === true && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header-nav').show("fade", { direction: "up"}, 100);
        } else if (scrolling === false && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header-nav').show("fade", { direction: "up"}, 100); 
        }
        prevScrollPos = currentScrollPos;  
    } 
    function mobileMenuUX() {
        var contentPlacement = $('#header').position().top + $('#header').height();

        if (window.location.href.indexOf('about')) {
            $('#sidebar').css('padding-top', contentPlacement); 
        }        
        $('#main-content').css('padding-top', contentPlacement); 
        $('#main-content').css('padding-top', "0"); 
        $(window).scroll(function() {
            scrolling = true; 
        })    
        hidingMenu = setInterval(hideShowMenuScroll, 100);
        hidingBlurb = setInterval(hideBlurbOnScroll, 100);
    }
    function desktopMenuUX() {   
        clearInterval(hidingMenu);
        clearInterval(hidingBlurb);         
        var contentPlacement = $('#header-nav').outerHeight(true) + 20;
         if (window.location.href.indexOf('about')) {
            $('#sidebar').css('padding-top', 0); 
        }   
        $('#main-content').css('padding-top', contentPlacement);         
        $('#header-nav').show("fade", { direction: "up"}, 100);  
        $('#header-blurb').show("fade", { direction: "down"}, 100);  
            // incase window is resized when these are hidden
            // need to incorporate tablet sizing, now permanently visible when in tablet sizing 
    }
    function checkScreenSize() {
        windowWidth = $(window).width();  
        if (windowWidth < mobileBreakpoint) {
            mobileMenuUX();          
        } else {;
            desktopMenuUX();
        }              
    }

// CODE TO RUN WHEN EVERYTHING IS LOADED 
    $(window).scroll(function() {
        scrollTop = window.scrollY;
    })

    checkScreenSize();

    $(window).resize(function() {
        clearInterval(hidingMenu);
        clearInterval(hidingBlurb);
        checkScreenSize();   
    }) 
});
