$(function(){
    /*--------- show and hide the menu  ---*/
    $('.button').on("click", function(){
      if($('body').hasClass('nav_is_visible') == true){
       $('body').removeClass('nav_is_visible');
       $('.button').removeClass('close');
          }
      else{
       $('body').addClass('nav_is_visible');
       $('.button').addClass('close');
         }
     });


    $('body').addClass('info_is_visible');
  
      
   function removeClasses() {
    $(".menu ul li").each(function() {
      var custom_class = $(this).find('a').data('class');
    $('body').removeClass(custom_class);
    });
  }
    
    $('.menu a').on('click',function(e){
      e.preventDefault();
      removeClasses();
      var custom_class = $(this).data('class');
      console.log(custom_class);
      $('body').addClass(custom_class);
    });
  });
  // REFERENCE TO GLOBAL SCOPE ON SCENE
  $('iframe').on("load",function(){ window.winFrame = $('iframe').prop("contentWindow") })