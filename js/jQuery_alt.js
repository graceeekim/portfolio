$(document).ready(function() { 
    var scrollTop = window.scrollY;
    var scrolling = false;    
    var prevScrollPos = 0;
    var hidingMenu;
    var url = window.location.pathname; 
    var media = $("video").not("[autoplay='autoplay']");
    var tolerancePixel = 40;    
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
        } else if ($(window).scrollTop() + $(window).height() == $(document).height() || window.scrollY == 0){
            $('#header').show("fade", {direction: "up"}, 200);
        }        
        prevScrollPos = currentScrollPos;  
    }              
    function hideShowMenuScroll() {
        $(window).on("scroll", function() {
                scrolling = true;    
            }) 
        hidingMenu = setInterval(checkScrollPos, 200);
    }    
    function pageNavCSS() {
        function removeUnderlinePageCSS(pageURL) {
            $("#menu-" + pageURL).css("border-bottom", "none");
            $("#menu-" + pageURL).on("mouseenter mousedown touchstart", function(){
                $("#menu-" + pageURL).css("border-bottom", "none"); 
            })
            $("#menu-" + pageURL).on("mouseleave mouseup touchend", function(){
                $("#menu-" + pageURL).css("border-bottom", "none");     
            })  
        }
        function underlinePageNav(pageURL) {
            $("#menu-" + pageURL).css("border-bottom", "1px solid black");
            $("#menu-" + pageURL).on("mouseenter mousedown touchstart", function(){
                $("#menu-" + pageURL).css("border-bottom", "1px solid #f37053"); 
            })
            $("#menu-" + pageURL).on("mouseleave mouseup touchend", function(){
                $("#menu-" + pageURL).css("border-bottom", "1px solid black");     
            })   
        }
        var url = window.location.pathname;
        if (url.indexOf("about") > -1 ) {
            underlinePageNav("about");        
        } else {
            removeUnderlinePageCSS("about");  
        }     
        if (url === "/" || url.indexOf("work") > -1 || url.indexOf("index") > -1 ) {
            underlinePageNav("index"); 
        } else {
            removeUnderlinePageCSS("index");
        }          
        if (url.indexOf("about") > -1  || url.indexOf("work") > -1 || url === "/" || url.indexOf("index") > -1 ) {                           
        } else {
            removeUnderlinePageCSS("index");
            removeUnderlinePageCSS("about");     
        }                         
    }   
    function scalePicOnHover() {
        $(".for-carousel").on("mouseenter mousedown touchstart", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1.05)");
            // $(this).find(".project-description").removeClass("hide");  
        })
        $(".for-carousel").on("mouseleave mouseup touchend", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1)");
            // $(this).find(".project-description").addClass("hide");      
        })            
    }            
    function updateScrollPos() {
        $(window).scroll(function() {
            scrollTop = window.scrollY;                        
        }) 
    }
    function updatePicOnHover() {
        $(".project-thumbnail").on({
            mouseenter: function() {
                $(this).find("img").css("opacity", "0");
            },
            mouseleave: function() {
                $(this).find("img").css("opacity", "1");
            }
        });
    }

    checkPausePlay(); 
    pageNavCSS();
    scalePicOnHover();
    updateScrollPos();
    updatePicOnHover();


});