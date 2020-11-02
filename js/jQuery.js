$(window).on("load", function() {

//  VARIABLES
    var mobileBreakpoint = 600;
    var windowWidth = $(window).width(); 
    var scrollTop = window.scrollY;
    var windowIsMobile = windowWidth < mobileBreakpoint;
    var windowIsDesktop = windowWidth > mobileBreakpoint;
    var scrolling = false;    
    var prevScrollPos = 0;
    var hidingMenu;
    var hidingBlurb;

 // FUNCTIONS
    function hideShowMenuScroll() {
        var currentScrollPos = scrollTop;     
        if (scrolling === true && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header').hide("fade", { direction: "down"}, 200);
        } else if (scrolling === false && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header').hide("fade", { direction: "down"}, 200); 
        } else if (scrolling === true && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header').show("fade", { direction: "up"}, 200);
        } else if (scrolling === false && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header').show("fade", { direction: "up"}, 200); 
        }
        prevScrollPos = currentScrollPos;  
    } 
    function mobileMenuUX() {
        blurbPlacement = $('#header').height()
        contentPlacement = $('#header').height() + $("#sidebar").height() + 70;

        if (window.location.href.indexOf('about') > -1) {
            $('#sidebar').css('padding-top', blurbPlacement); 
        }   
        if (window.location.href.indexOf('index') > -1) {
            $('#sidebar').css('padding-top', blurbPlacement);
            $('#main-content').css('padding-top', contentPlacement); 
        }
        if (window.location.href.indexOf('project') > -1) {
            $('#sidebar').css('padding-top', blurbPlacement - 30);
        }       
        $(window).scroll(function() {
            scrolling = true; 
        })    
        hidingMenu = setInterval(hideShowMenuScroll, 200);
        hidingBlurb = setInterval(hideBlurbOnScroll, 200);
    }
    function desktopMenuUX() {   
        clearInterval(hidingMenu);
        clearInterval(hidingBlurb);         
       
        $('#header').show();
    }
    function checkScreenSize() {
        var windowWidth = $(window).width();  
        if (windowWidth < mobileBreakpoint) {
            mobileMenuUX();          
        } else {;
            desktopMenuUX();
        }     
        contentPlacement = $('#header').outerHeight(true);         
    }
    function projectCarouselPos() {
        contentPlacement = $('#header').outerHeight(true) + 20;
        spacerHeight = $(window).height() - contentPlacement - $("#project-carousel").outerHeight(true);

        if (window.location.href.indexOf('project') > -1 && windowIsMobile) {
            $('#pre-carousel-spacer').css('height', contentPlacement);             
            $('#post-carousel-spacer').css('height', spacerHeight - 33);             
        } else {
            $('#pre-carousel-spacer').css('height', contentPlacement); 
            $('#post-carousel-spacer').css('height', spacerHeight); 
        }       
    }

// CODE TO RUN WHEN EVERYTHING IS LOADED

    // $('.project-container').hover(function() {
    //     $(this).find("img.thumbnail").css("transform", "scale(1.05");
    // }, function() {
    //     $(this).find("img.thumbnail").css("transform", "scale(1");
    // })
   if (window.location.href.indexOf('about') > -1 ) {
        $("#menu-about").css("text-decoration", "underline");
   }
   if (window.location.href.indexOf('index') > -1 ) {
        $("#menu-work").css("text-decoration", "underline");
   }   
    // $(window).scroll(function() {
    //     scrollTop = window.scrollY;
    // }) 

    // checkScreenSize();
    // projectCarouselPos();    

    // $("#menu-about").click(function(e) {
    //     e.preventDefault();

    //     $("#sidebar").load("about.html #sidebar", function() {
    //         alert("load was performed");
    //     });
    // });

    // $(window).resize(function() {
    //     clearInterval(hidingMenu);
    //     clearInterval(hidingBlurb);
    //     checkScreenSize();  
    //     projectCarouselPos();


    // // $("body").on("click", "#menu-about", function() {
    // //     var href = $(this).attr("href");
    // //     $("#main-content").load(href);
    // //     return false;
    // // }) 
    // //     var paddingSpace = $(window).height() - ($("#header").height() + $("#sidebar").height() + $("#footer").height() + 60);
    // // $("#contact").css("padding-top", paddingSpace);  
    // })
    // var paddingSpace = $(window).height() - ($("#header").height() + $("#sidebar").height() + $("#footer").height() + 60);
    // $("#contact").css("padding-top", paddingSpace);    
});
$(document).ready(function() { 
    $('.project-container').on("mouseenter mousedown touchstart touchmove", function(){
        $(this).find("img.thumbnail").css("transform", "scale(1.05)");
        $(this).find("h1").css("color", "#f37053");            
    })
    $('.project-container').on("mouseleave mouseup touchend touchcancel", function(){
        $(this).find("img.thumbnail").css("transform", "scale(1)");
        $(this).find("h1").css("color", "black");             
    })      
});
