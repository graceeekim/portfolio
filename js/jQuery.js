$(document).ready(function() { 
    var scrollTop = window.scrollY;
    var scrolling = false;    
    var prevScrollPos = 0;
    var hidingMenu;
    var url = window.location.pathname;
    //
    function changeHanbanCut(){
        $("#hanCut").click(function(){
            $("#hanbanPreview").css("font-family", "hanbanhan");
            $("#hanCut").addClass("activeHanbanCut")
            $("#banCut").removeClass("activeHanbanCut")
        })
        $("#banCut").click(function(){
            $("#hanbanPreview").css("font-family", "hanbanban");
            $("#banCut").addClass("activeHanbanCut")
            $("#hanCut").removeClass("activeHanbanCut")
        })    
    }        
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
        }   else if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('#header').show("fade", {direction: "up"}, 200);
        }        
        prevScrollPos = currentScrollPos;  
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
            underlinePageNav("work"); 
        } else {
            removeUnderlinePageCSS("work");
        }          
        if (url.indexOf("about") > -1  || url.indexOf("work") > -1 || url === "/") {  
            $("#intro-bio").css({             
                position: "static",
                top: "0"
            });                      
            $("#intro-bio").delay(200).animate({
                opacity: "1.0"},
                {duration: 700, easing: 'easeOutBounce'
            });                            
        } else {
            $("#intro-bio").css({
                opacity: "0",             
                position: "absolute",
                top: "-50%"
            });
            removeUnderlinePageCSS("work");
            removeUnderlinePageCSS("about");     
        }                         
    }
    function projectCarouselFlickity() {
        $("#carousel-container").flickity({
            cellAlign: "left",
            freeScroll: true,
            wrapAround: true,
            groupCells: true,
            draggable: true,
            arrowShape: { 
                x0: 10,
                x1: 60, y1: 45,
                x2: 65, y2: 40,
                x3: 20
            }
            // autoPlay: 3500
        });  
    }    
    function reloadOnPopstate() {
       $(window).on('popstate', function() {
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
        $('.project-container, .for-carousel').on("mouseenter mousedown touchstart", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1.05)");
            $(this).find(".project-description").removeClass("hide");  
        })
        $('.project-container, .for-carousel').on("mouseleave mouseup touchend", function(){
            $(this).find("img.thumbnail").css("transform", "scale(1)");
            $(this).find(".project-description").addClass("hide");      
        })            
    }         
    function staticRevealHideClass() { 
        if (url.indexOf("about") > -1 ) {
            revealHideClass("about");            
        } else
        if (url.indexOf("modu") > -1 ) {
            revealHideClass("modu");
        } else
        if (url.indexOf('hanban') > -1 ) {
            revealHideClass("hanban");
        } else
        if (url.indexOf("pathwise") > -1 ) {
            revealHideClass("pathwise");
        } else
        if (url.indexOf("raw-pet-food") > -1 ) {
            revealHideClass("raw-pet-food");
        } else
        if (url === "/" || url.indexOf("work") > -1) {
            revealHideClass("work");
        }                               
    }
    function loadPagePushState(pageURL, pageTitle) {
        revealHideClass(pageURL);
        history.pushState({}, "", "/" + pageURL);
        url = "/" + pageURL;
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
    pageNavCSS();
    staticRevealHideClass();
    scalePicOnHover();
    changeHanbanCut();
    reloadOnPopstate();
    projectCarouselFlickity();
    updateScrollPos();
    hideShowMenuScroll();
    loadPageContent("about", "About");
    loadPageContent("work", "Work");    
    loadPageContent("modu", "mod.u Modular Clothing");
    loadPageContent("pathwise", "Pathwise Credit Union");
    loadPageContent("hanban", "Hanban Fusion Typeface");
    loadPageContent("raw-pet-food", "Raw Pet Food Subscription Service");
//
});