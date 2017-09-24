/**
 * Custom js for theme
 */
jQuery(function($) {

    'use strict';

    var pete = window.pete || {};

    /* =============================================================================
       pete SKIP LINK FOCUS FIX (from _s)
       ========================================================================== */

    pete.skipLinkFix = function() {
        var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
            is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
            is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

        if ((is_webkit || is_opera || is_ie) && document.getElementById && window.addEventListener) {
            window.addEventListener('hashchange', function() {
                var id = location.hash.substring(1),
                    element;

                if (!(/^[A-z0-9_-]+$/.test(id))) {
                    return;
                }

                element = document.getElementById(id);

                if (element) {
                    if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                        element.tabIndex = -1;
                    }

                    element.focus();
                }
            }, false);
        }
    };

    /* =============================================================================
     pete NAVIGATION
     ========================================================================== */

    pete.navigation = function() {
        var hamburger = $('.menu-toggle');
        var drawer = $('.site-navigation');

        hamburger.click(function() {
            $('body').toggleClass('lock');
            hamburger.toggleClass('closer');
            drawer.toggleClass('expanded').slideToggle(150);
            if (drawer.hasClass('expanded')) {
                hamburger.attr('aria-expanded', 'true');
            } else {
                hamburger.attr('aria-expanded', 'false');
            }
        });

        //default body padding for a fixed header
        function bodyPadding() {
            //$('.fixed-header').css('padding-top',$('.site-header').height());
        }

        // jQuery to collapse the navbar on scroll
        function minimize() {
            if ($(".site-header").offset().top > 50) {
                $(".site-header").addClass("minimize");
                $('body').trigger('minimized');
            } else {
                $(".site-header").removeClass("minimize");
            }
        }

        $(window).on('minimized', function() {
          //  console.log('worked');
        });

        $(window).scroll(minimize);
        $(window).resize(bodyPadding);
        bodyPadding();
        minimize();

    }


        /* =============================================================================
          pete SLIDER FIX
          ========================================================================== */

        pete.sliderFix = function() {

          // element that has tabs
          var elem = $('.tailor-tabs');

          $(elem).on('click', function() {
            $('.slick-slider').slick('setPosition');
          });
        }

    /* =============================================================================
        pete WIDGETS
        ========================================================================== */

    pete.widgets = function() {

        //rss widget tweaks
        if ($('.widget_rss').length >= 1) {
            //truncate summary
            $('.rssSummary').each(function() {
                var summary = $(this).text(); //replace with your string.
                var maxLength = 70; // maximum number of characters to extract
                //trim the string to the maximum length
                var excerpt = summary.substr(0, maxLength);
                //re-trim if we are in the middle of a word
                excerpt = excerpt.substr(0, Math.min(excerpt.length, excerpt.lastIndexOf(' ')));
                //remove &nbsp;&nbsp; indenting
                excerpt = excerpt.replace(/\s\s+/g, ' ') + '&hellip;';
                $(this).html(excerpt);
            });
        }

        //add badges to category & archive counts
        if ($('.widget_archive, .widget_categories').length >= 1) {
            $('.widget_archive li, .widget_categories li').each(function() {
                var item = $(this).html();
                item = item.replace('(', '<small class="count">');
                item = item.replace(')', '</small>');
                $(this).html(item);
                //add posts
                if ($('.count', this).text() === '1') {
                    $('.count', this).append(' Post');
                } else {
                    //  console.log($('.count', this).text())
                    $('.count', this).append(' Posts');
                }
            });
        }

        //add badges to category & archive counts
        if ($('.widget_tag_cloud').length >= 1) {
            $('.widget_tag_cloud a').each(function() {
                var count = $(this).attr('title');
                count = count.replace(' topics', '');
                count = count.replace(' topic', '');
                $(this).append(' &nbsp;<span class="badge">' + count + '</span>');
            });
        }
    };




    /* =============================================================================
    pete SMOOTH SCROLL
    ========================================================================== */

   pete.smoothScroll = function() {

     var header,
         headerHeight,
         currLink,
         refElement,
         headerLink,
         page,
         hash,
         anchor;

     page = $('html, body');
     header = $('.site-header');
     headerLink = header.find('.menu-item > a');
     anchor = $('a[href*="#"]').not('.top-link a');

     // animation
     function animateScroll(refElement) {
       headerHeight = header.outerHeight() - 1;
       if($(window).width() > 720) {
         if($(window).scrollTop() < 50) {
           $('.site-header').clone().appendTo( "body" ).css('z-index','-1000').css('transition','none').addClass('minimize cloned');
           var newHeight = $('.site-header cloned').height();
           console.log(newHeight);
           $('.cloned').remove();
         } else {
           newHeight = headerHeight;
           console.log(newHeight);
         }
        } else {
          newHeight = 0;
       }
       page.animate({
       scrollTop: $(refElement).offset().top
      }, 850,  'easeInOutQuint');
     }

     // click event on anchor tag
     anchor.on('click', function(e){
       // ignore redirecting links
       if(anchor.hasClass('redirect')) {
         // do nothing
       } else {

       e.preventDefault();
       currLink = $(this);
       refElement = $(currLink.attr("href"));
       // keep the focused/active class for a bit while it scrolls
       setTimeout(function(){ headerLink.blur(); }, 1000);
       if(page.find(refElement).length >= 1) {
         animateScroll(refElement);
       } else {
         return false;
         }
     } // endif redirect
     });

     // if arrived from other page
    hash = window.location.hash;
    if(hash && $('body').hasClass('home')) {
    if(page.find(hash).length >= 1) {
      animateScroll(hash);
     }
    }
    // anchor tags that redirect to homepage
    header.find(anchor).each(function() {
      var link = $(this).attr('href');
      if(page.find(link).length == 0) {
        $(this).attr("href", '/' +link ).addClass('redirect');
      }
     });
   }


    /* =============================================================================
     pete MENU HIGHLIGHT
     ========================================================================== */

    pete.menuHighlight = function(){

      var page = $('html, body');
      var header = $('.site-header');
      var classname = 'link-active'; // name of the active class
      var height = header.height();
      var link = header.find('.menu-item > a[href*="#"]');
      var scrollPos,
          currLink,
          refElement;

      function menuScroll(event){
        var scrollPos = $(document).scrollTop() + height;
        link.each(function () {

          // ignore redirecting links
          if(link.hasClass('redirect')) {
            // do nothing
          } else {

          currLink = $(this);
          refElement = $(currLink.attr("href"));
          // height of distance from top and of element combined
          if(page.find(refElement).length >= 1) {
          var fullHeight = refElement.position().top + refElement.outerHeight();
            if(refElement.position().top < scrollPos && scrollPos < fullHeight) {
              link.removeClass(classname);
              currLink.addClass(classname);
            } else {
              currLink.removeClass(classname);
              }
            }
          } // endif redirect
        });
       }

       $(document).on("scroll", menuScroll); // initiate scroll event

      }

    // Pete Parallax
      pete.parallax = function() {
        var scrolled = $(document).scrollTop()
        var newvar = Math.floor(scrolled * .2);
        var bg = $('.hero-bg');
        bg.css('transform','translate3d(0px,'+newvar+'px,0)');
      }


      // Pete Letter Replace in Hero
      pete.letterReplace = function() {
      //vars
      var  dir = $('.themeDir').attr('value'),
      img = '<object class="svg" height="50px" type="image/svg+xml" data="'+dir+'/assets/img/sonisk-o.svg" class="logo"></object>',
      content = $('#hero .content h1'),
      contentText = content.text(),
      //  newContent = contentText.replace(/lo/g, 'l'+img).replace(/So/g, 'S'+img);
      newContent = contentText.replace('o', img);
      //replace HTML
      content.html(newContent);
      }


  // Form Signup

  pete.signUp = function() {

  $('.sonisk-signup').submit(function(e){

    // stop the form action initially
    e.preventDefault();

    //vars
    var form = $(this),
    action = $(this).attr('action'),
    val = form.children('#mc-email').val();

    // ajax call
    $('body').addClass("body-load").addClass('page-load');

    $.ajax({
      url: action,
      type: 'POST',
      data: {
        email_address: val
      },
    }).success(function(data){

      $('body').removeClass("body-load").removeClass('page-load');

    // chop of json file to test for strings
    var parsed = JSON.parse(data);
    // console.log(parsed);
    // results
    if(parsed.id){
      //successful add
      var text = 'Thank you for subscribing.';
      $('#page').append("<div class='signup-result'><p>"+text+"</p></div>");
      $('.sonisk-signup').html('<p>'+text+'</p>');
    } else if (parsed.title == 'Member Exists') {
      //already on list
      var text = "Thanks, but you're already signed up.";
      $('#page').append("<div class='signup-result'><p>"+text+"</p></div>");
    } else {
      //something went wrong with the API call
      var text = 'An error occurred, please re-enter a valid email address.';
      $('#page').append("<div class='signup-result'><p>"+text+"</p></div>");
    }

    $('.signup-result').fadeIn(300);
    });
  });

  $('html, body').on('click touchstart', '.signup-result', function() {
      var text = $(this).children('p').text();
      $('.signup-result').fadeOut(300);
      setTimeout(function(){ $('.signup-result').remove() }, 500);
      $('.sonisk-signup input[type=email]').val('');
      //$('.sonisk-signup').html('<p>'+text+'</p>');
  });
}


pete.featureFade = function() {
  $('.feature').each(function(i) {
      //console.log(i);
      var top = $(this).offset().top;
      var height = $(this).outerHeight();
      var half = height / 2
      var total = height + half;
      var body = $(document);
      //console.log(height);
      var dependent = 700;
    //  console.log(top);
      if(body.scrollTop() >= top - dependent) {
        var img = $(this).children().first();
        var content = $(this).children().eq(1);
        img.addClass("fade-in");
        setTimeout(function() {
          content.addClass("fade-in");
        }, 200); // 2000 is in mil sec eq to 2 sec.
      }
      i++;
  });
}



    /* =============================================================================
        INIT
        ========================================================================== */

    $(window).scroll(function() {
        pete.parallax();
        pete.featureFade();
    });

    $(document).ready(function() {
        pete.signUp();
        pete.featureFade();
        pete.letterReplace();
        pete.skipLinkFix();
        pete.navigation();
        pete.menuHighlight();
        pete.smoothScroll();
        pete.sliderFix();
        pete.widgets();
    });

});
