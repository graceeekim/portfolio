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
        }  else if ($(window).scrollTop() + $(window).height() == $(document).height() || window.scrollY == 0){
            $('#header').show("fade", {direction: "up"}, 200);
        }        
        prevScrollPos = currentScrollPos;  
    }   
    function checkMedia(){
        if (url.indexOf("raw-pet-food") > -1) {
            var scrollTop = $(window).scrollTop() + tolerancePixel;
            var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

            media.each(function(index, el) {
                var yTopMedia = $(this).offset().top;
                var yBottomMedia = $(this).height() + yTopMedia;

                if(scrollTop < yBottomMedia && scrollBottom > yTopMedia){
                    $(this).get(0).play();
                } else {
                    $(this).get(0).pause();
                }
            }, setInterval(1000));
        } else {}
    }
    function checkPausePlay() {
        $(document).on('scroll', checkMedia);
    }        
    function hideShowMenuScroll() {
        $(window).scroll(function() {
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
        if (url === "/" || url.indexOf("work") > -1 ) {
            underlinePageNav("index"); 
        } else {
            removeUnderlinePageCSS("index");
        }          
        if (url.indexOf("about") > -1  || url.indexOf("work") > -1 || url === "/") {                           
        } else {
            removeUnderlinePageCSS("index");
            removeUnderlinePageCSS("about");     
        }                         
    }
    function projectCarouselFlickity() {
        $("#carousel-container").flickity({
            asNavFor: "#carousel-container",
            cellAlign: "left",
            draggable: true,
            prevNextButtons: false
        });  
    }    
    function reloadOnPopstate() {
       $(window).on("popstate", function() {
          location.reload(true);
       });        
    }         
    function revealHideClass(pageURL) {
        window.scrollTo(0, 0);
        $("." + pageURL + ".page-content.hide").delay(200).animate({
            opacity: "1.0"},
            {duration: 700, easing: 'easeOutBounce'
        });                  
    }  
    function scalePicOnHover() {
        $(".for-carousel").on("mouseenter mousedown touchstart", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1.05)");
            $(this).find(".project-description").removeClass("hide");  
        })
        $(".for-carousel").on("mouseleave mouseup touchend", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1)");
            $(this).find(".project-description").addClass("hide");      
        })            
    }         
    function staticRevealHideClass() { 
        if (url.indexOf("about") > -1 ) {
            revealHideClass("about");            
        } else
        if (url.indexOf("pathwise") > -1 ) {
            revealHideClass("pathwise");
        } else
        if (url.indexOf("raw-pet-food") > -1 ) {
            revealHideClass("raw-pet-food");
        } else
        if (url === "/") {
            revealHideClass("index");
        }                               
    }
    function loadPagePushState(pageURL, pageTitle) {
        revealHideClass(pageURL);
        if (pageURL = "index") {
            history.pushState({}, "", "/work");
             url = "/work";
        } else {
            history.pushState({}, "", "/" + pageURL);
            url = "/" + pageURL;
        }
        document.title = pageTitle + " | Grace Kim"; 
        projectCarouselFlickity();
        scalePicOnHover();
        pageNavCSS();
    } 
    function loadPageContent(pageURL, pageTitle) {
        $("body").on("click", "a." + pageURL, function(e){
            e.preventDefault();
            e.stopPropagation();
            $("#content-container").load(pageURL + ".html .page-content", function(){
                loadPagePushState(pageURL, pageTitle);        
            });     
        })        
     }
    function updateScrollPos() {
        $(window).scroll(function() {
            scrollTop = window.scrollY;                        
        }) 
    }
    //   
    //    
    //
    checkPausePlay();   
    pageNavCSS();
    staticRevealHideClass();
    scalePicOnHover();
    reloadOnPopstate();
    projectCarouselFlickity();
    updateScrollPos();
    hideShowMenuScroll();
    loadPageContent("about", "About");
    loadPageContent("index", "Work");    
    loadPageContent("pathwise", "Pathwise Credit Union");
    loadPageContent("raw-pet-food", "Raw Pet Food Subscription Service");
//
});