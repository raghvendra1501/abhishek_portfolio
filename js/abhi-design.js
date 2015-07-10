
        function goToPage(div_id, next) {
            // $('html, body').animate({
            //     scrollTop: $("#"+div_id).offset().top 
            // }, 500);
            prev = current;
            if(prev > next) {
              animateToNext(prev, next, true , "top");
            } else {
              animateToNext(prev, next, false, "top");  
            }
            var link_num = div_id.split("-")[1];      
            addUnderLine(link_num);
        }

        function changeMenuIconColor(color) {
            // var child = $("#nav-toggle").children();
            // child.css('background',color);
        }

        function setIconColorBlack() {
          $("#nav-toggle span").css("background","#000000");
        }

        function setIconColorwhite() {
          $("#nav-toggle span").css("background","#ffffff");
        }

        function addUnderLine(id) {
            for (i=1; i<=4; i++) {
                document.getElementById("link-"+i).style.textDecoration="none";
            }
            document.getElementById("link-"+id).style.textDecoration="underline";
            $("#nav-toggle").removeClass("active");
            $("#fixed-popup").fadeOut(500);
            $("#fixed-popup-menu").fadeOut(500);
            setTimeout(function(){
              if( ($(window).scrollTop() >= $(window).height()) && ($(window).scrollTop() < ($(document).height()-$(window).height()-20))) {
                setIconColorBlack();
              } else {
                setIconColorwhite();
              }
            }, 505);
        }

        document.querySelector( "#nav-toggle" ).addEventListener( "click", function() {
          setIconColorwhite();
          this.classList.toggle( "active" );
          if($("#nav-toggle").hasClass("active")){
            $("#fixed-popup").fadeIn(500);
            $("#fixed-popup-menu").fadeIn(500);
          }else {
            $("#fixed-popup").fadeOut(500);
            $("#fixed-popup-menu").fadeOut(500);
            setTimeout(function(){ 
              if( ($(window).scrollTop() >= $(window).height()) && ($(window).scrollTop() < ($(document).height()-$(window).height()-20))) {
                setIconColorBlack();
              }
            }, 505);
          }
        });

    $(document).scroll(function(e){
      if(popupStatus) {
         //$( 'img:in-viewport(-200)' ).animate( {width: '100%', opacity: "1.0", height: '100%'} );
         $( '.work-section-img:in-viewport(-10)' ).animate( {'margin-top': '0px',opacity: "1.0"} , 1000 );
         $( '.faded:in-viewport(-25)' ).animate( {opacity: "1.0"} , 1000 );
         $( '.faded:in-viewport()' ).animate( {opacity: '1'}, 1000 );
         //$( 'img:in-viewport(-400)' ).addClass("makebigslide");
         // setTimeout(function() {
         //  $( 'img:in-viewport(-400)' ).css()
         // })
         //var $div = $( '.inout' );
         // if ( $( '.inout' ).is( ':in-viewport(-400)' ) ) {
         //    $('div').addClass("makebigslide");//css( 'width', '100%' );
         // }
      }
      // if( ($(window).scrollTop() >= $(window).height()) && ($(window).scrollTop() < ($(document).height()-$(window).height()-20))) {
      //   if(!$("#nav-toggle").hasClass("active")) {
      //     setIconColorBlack();
      //   } else {
      //     setIconColorwhite();
      //   }
      // } else {
      //     setIconColorwhite();
      // } 
    });
    
    function sendEmail() {
       var name = $("#user-name").val();
       var email = $("#user-email").val();
       var message = $("#message").val();
       window.location.href="mailto:abhishek.luhadiya@gmail.com?subject="+name+"%20<"+email+">%20send%20you%20a%20message%20on%20portfolio"+"&body="+message;
    }

       var current = 1;
       var moveStatus = true;
       var upper = 5;
       
       var workStart = 2;
       var workEnd = 3;

       var popupStatus = false;

       var increased_height = [400, 800, 400, 800, 400, 400];

       $(document).keydown(function(e) {
           if(!popupStatus) {
               var prev = current;
               
               switch(e.which) {
                  case 37: // left
                    if((current > workStart) && (current <= workEnd )) {
                        next = current - 1;
                        animateToNext(prev, next, true, "left");
                     }
                     break;
                    break;
                  case 38: // up
                  case 33: // pageup
                    var next = current - 1;
                    if(next < 1)
                     next = upper;
                     if((next >= workStart) && (next <= workEnd) ) {
                        if((current >= workStart) && (current <= workEnd)) {
                          next = workStart-1;
                        }else {
                          next = workStart;
                        }
                     }
                        
                     animateToNext(prev, next, true, "top");       
                    break;
                  case 39: // right  
                    if((current >= workStart) && (current < workEnd )) {
                        next = current + 1;
                        animateToNext(prev, next, false, "right");
                     }
                     break;
                  case 40: // down
                  case 34: // pagedown
                    var next = current + 1;
                    
                    if(next > upper)
                       next = 1;
                    
                    if((next > workStart) && (next <= workEnd ))  {

                       next = workEnd+1;
                    } 
                       animateToNext(prev, next, false, "top");
                   break;
                  default: return; // exit this handler for other keys
               }
               e.preventDefault(); // prevent the default action (scroll / move caret)
             }
       });

       $('html').on ('DOMMouseScroll', function (e) {
        if(!popupStatus) {        
           var delta = e.originalEvent.detail;
           if (delta < 0) {
                var next = current - 1;
                prev = current;
                if(next < 1)
                 next = upper;
                 if((next >= workStart) && (next <= workEnd) ) {
                    if((current >= workStart) && (current <= workEnd)) {
                      next = workStart-1;
                    }else {
                      next = workStart;
                    }
                 }
                 animateToNext(prev, next, true, "top"); 
           } else if (delta > 0) {
                var next = current + 1;
                prev = current;  
                if(next > upper)
                   next = 1;
                if((next > workStart) && (next <= workEnd ))  {
                   next = workEnd+1;
                } 
                animateToNext(prev, next, false, "top");           
           }
         }
       });


       $('html').on ('mousewheel', function (e) {
           if(!popupStatus) {
              var delta = e.originalEvent.wheelDelta;
               if (delta < 0) {
                  var next = current + 1;
                    prev = current;
                    if(next > upper)
                       next = 1;
                    if((next > workStart) && (next <= workEnd ))  {
                       next = workEnd+1;
                    } 
                       animateToNext(prev, next, false, "top");
               } else if (delta > 0) {
                  prev = current;
                    var next = current - 1;
                    if(next < 1)
                     next = upper;
                     if((next >= workStart) && (next <= workEnd) ) {
                        if((current >= workStart) && (current <= workEnd)) {
                          next = workStart-1;
                        }else {
                          next = workStart;
                        }
                     }
                     animateToNext(prev, next, true, "top");             
               }
           }
       });

       function checkForCurrentPage() {
         if(!$(".pt-page-"+current).hasClass("pt-page-current")) {
          $(".pt-page-"+current).addClass("pt-page-current");
         }
         moveStatus = true;
       }

       function animateToSlide(prev, next) {
         if(prev > next) {
          animateToNext(prev, next, true, "left");    
         }else {
          animateToNext(prev, next, false, "right")
         }
       }

      function animateToNext(prev, next, backward, type) {
        if ( current != next ) {
          if(moveStatus) {
            moveStatus = false;
          $(".pt-page-"+next).addClass("pt-page-current");
          if(backward) {
            if(type == "left") {
               $(".pt-page-"+prev).addClass("pt-page-rotateSlideOutLeft");
              $(".pt-page-"+next).addClass("pt-page-rotateSlideInLeft");
            } else {
              $(".pt-page-"+prev).addClass("pt-page-moveToBottom");  //moveToBottomEasing
              $(".pt-page-"+next).addClass("pt-page-moveFromTop");
            }
          }else {
            if (type == "right") {
              $(".pt-page-"+prev).addClass("pt-page-rotateSlideOut");
              $(".pt-page-"+next).addClass("pt-page-rotateSlideIn");
            } else {
              $(".pt-page-"+prev).addClass("pt-page-moveToTop"); //moveToTopEasing
              $(".pt-page-"+next).addClass("pt-page-moveFromBottom"); 
            }
            
          }
          setTimeout( function(){ 
            $(".pt-page-"+prev).removeClass("pt-page-current"); 
            $(".pt-page-"+prev).removeClass("pt-page-moveToBottom"); //moveToBottomEasing
            $(".pt-page-"+next).removeClass("pt-page-moveFromTop");
            $(".pt-page-"+prev).removeClass("pt-page-moveToTop"); //moveToTopEasing
            $(".pt-page-"+next).removeClass("pt-page-moveFromBottom");
            // $(".pt-page-"+prev).removeClass("pt-page-rotateSlideOut");
            // $(".pt-page-"+next).removeClass("pt-page-rotateSlideIn"); 
            // $(".pt-page-"+prev).removeClass("pt-page-rotateSlideOutLeft");
            // $(".pt-page-"+next).removeClass("pt-page-rotateSlideInLeft"); 
          checkForCurrentPage();
          }, 600);

          setTimeout( function(){ 
            $(".pt-page-"+prev).removeClass("pt-page-rotateSlideOut");
            $(".pt-page-"+next).removeClass("pt-page-rotateSlideIn");
            $(".pt-page-"+prev).removeClass("pt-page-rotateSlideOutLeft");
            $(".pt-page-"+next).removeClass("pt-page-rotateSlideInLeft"); 
          checkForCurrentPage();
          }, 1000);

          current = next;
            if((current >= workStart) && (current <= workEnd)) {
              $(".pt-page-btn a").removeClass("current");
              $("#pt-page-"+current+"-btn a").addClass("current");
              $("#dotstyle-work").show();
            }else {
              $("#dotstyle-work").hide();
            }
          }
        }
       }
         
      function makeItLarge(div_id, project_div) {
        //console.log(div_id+" "+project_div);
        var project_num = project_div.split('-')[1];
        var increment_length = increased_height[project_num];

        popupStatus = true;
        showHideProjects(project_div);
        $("#"+div_id).addClass("pt-page-makeBigger");
        $("#work-popup").css('opacity', "0");
          setTimeout( function() {
            $(".pt-page").addClass('no-bg');
            $(".project-slide-texts").hide();
          }, 10);
          setTimeout( function(){ 
            //$("#work-popup").height("20");
            $("#work-popup").show();
            $(".work-section").fadeOut();
            $(".scroller-img").fadeOut();
            $("#work-popup").addClass("pt-page-makeBiggerPopup");
            var height = $("#"+project_div).height();
            $("#work-popup").height(height+300-increment_length+"px");
            $("body").css('overflow', 'auto');
            $("html").css('overflow', 'auto');
          }, 500);

          setTimeout( function(){ 
            $("#"+div_id).removeClass("pt-page-makeBigger"); 
            $("#menu-icon-2").show(500);
            $(".work-section").fadeIn();
            $(".scroller-img").fadeIn();
            $("#work-popup").css({opacity:"1.0", width: "100%"});
            $("#work-popup").removeClass("pt-page-makeBiggerPopup");
          }, 1300);

      }

      function makeItOff() {
        //$("#work-popup").hide();
        $(".project-slide-texts").show();
        $(".pt-page").removeClass('no-bg');
        $("#menu-icon-2").hide();
        $("body").css('overflow', 'hidden');
        $("html").css('overflow', 'hidden');

        $( '.work-section-img' ).css( {'margin-top': '100px',opacity: "0.5"});
        $( '.faded' ).css({opacity: "0"});
        $(".work-section").hide();
        $(".scroller-img").hide();

        $("#work-popup").addClass("close-door");
          setTimeout( function(){ 
            $("#work-popup").hide();
            $(".work-section").show();
            $(".scroller-img").show();
            //$("#page-2").removeClass("pt-page-makeBigger");
            $("#work-popup").removeClass("close-door");
          }, 800);
        popupStatus = false;
      }

      function showHideProjects(project_div) {
        var number = project_div.split('-')[1];
        for(i = workStart; i <= workEnd; i++) {
            if (i < number) {
              $("#project-"+i).hide();
            } else {
              $("#project-"+i).show();
            }
        }
      }

      function openNextWork(bottom_div, project_div, next) {
        var increment_length = increased_height[next];
        console.log(increment_length);
        $("#"+bottom_div).fadeOut(1000);
        $("#"+bottom_div+"text").fadeOut(1000);
        var curr_h = $("#"+project_div).height();
        var next_h = $("#project-"+next).height();
        $("#work-popup").height(curr_h+next_h+300-increment_length+"px");
        console.log(curr_h+next_h+300-increment_length);
        $('html, body').animate({
            scrollTop: $("#"+project_div).height()
        }, 600);
        setTimeout(function() {
          $("html, window").css('overflow', 'hidden');
          $("#"+project_div).hide();
          $('html, body').animate({
            scrollTop: "0px"
          }, 0);
          $("#work-popup").height(next_h+300-increment_length+"px");
          $("html, window").css('overflow', 'auto');
        }, 600);
        
      }       
