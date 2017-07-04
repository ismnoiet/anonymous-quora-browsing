(function() {
  var item = document.querySelector('.vertical_alignment_wrapper');
  if(item !== undefined){
    item.parentNode.remove()
    document.body.style.overflow = 'scroll';
  }
}());