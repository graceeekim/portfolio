$(document).ready(function() { 
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
    hideShowMenuScroll();
    updateScrollPos();
    updatePicOnHover();


});