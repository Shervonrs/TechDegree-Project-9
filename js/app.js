const mt_parallax = document.getElementsByClassName('js-parallax-mtn');
const parallaxInstance = new Parallax( mt_parallax, {
  relativeInput: true
});

$(document).ready(function (){
  $('#fullpage').fullpage({
    autoScrolling:true,
    scrollHorizontally: true
  });
  // methods
  $.fn.fullpage.setAllowScrolling(true);
});
