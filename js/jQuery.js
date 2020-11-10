$(window).on("load", function() {
    //
    var scrollTop = window.scrollY;
    var scrolling = false;    
    var prevScrollPos = 0;
    var hidingMenu;
    //
    function checkScrollPos() {
        var currentScrollPos = scrollTop;     
        if (scrolling === true && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header').hide("fade", {direction: "up"}, 200);
        } else if (scrolling === false && prevScrollPos < currentScrollPos && currentScrollPos > 2) {
            $('#header').hide("fade", {direction: "up"}, 200); 
        } else if (scrolling === true && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header').show("fade", {direction: "up"}, 200);
        } else if (scrolling === false && prevScrollPos > currentScrollPos || scrollTop <= 0) {
            $('#header').show("fade", {direction: "up"}, 200); 
        }
        prevScrollPos = currentScrollPos;  
    }     
    function hideShowMenuScroll() {
        contentPlacement = $('#header').height();
        $('#main-content').css('padding-top', contentPlacement); //NEED TO FIX
        $(window).scroll(function() {
            scrolling = true; 
        })    
        hidingMenu = setInterval(checkScrollPos, 200);
    }
    function updateScrollPos() {
         $(window).scroll(function() {
            scrollTop = window.scrollY;
        }) 
    }
    function updateHeaderOnResize() {
        $(window).resize(function() {
            clearInterval(hidingMenu);
            hideShowMenuScroll();
        })
    }
   //
    updateScrollPos();
    updateHeaderOnResize();
    hideShowMenuScroll();
});
$(document).ready(function() { 
    //
    function pageNavCSS() {
        if (window.location.href.indexOf('about') > -1 ) {
            $("#menu-about").css("text-decoration", "underline");
        }
        if (window.location.href.indexOf('index') > -1 ) {
            $("#menu-work").css("text-decoration", "underline");
        } 
    }
    function scalePicOnHover() {
        $('.project-container').on("mouseenter mousedown touchstart", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1.05)");
            $(this).find("h1").css("color", "#f37053");            
        })
        $('.project-container').on("mouseleave mouseup touchend", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1)");
            $(this).find("h1").css("color", "black");             
        })  
    }
    //
    pageNavCSS();
    scalePicOnHover();

        if (window.location.href.indexOf('test') > -1 ) {
            $("#menu-about").on("click", function(){
                $("#main-content").load("about.html #main-content", function() {
                    console.log("loaded!")
                })
            history.pushState(null, "this is a test", "about.html");
            })
        }    
});