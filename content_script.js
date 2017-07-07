(function() {
  deleteElements('.vertical_alignment_wrapper, .SignupFooter');

  // credits to @wOxxOm on stackoverflow:
  // https://stackoverflow.com/questions/32533580/deleting-dom-elements-before-the-page-is-displayed-to-the-screen-in-a-chrome-ex

  function deleteElements(selector) {
      // in case the content script was injected after the page is partially loaded
      doDelete(document.querySelectorAll(selector));

      var mo = new MutationObserver(process);
      mo.observe(document, {subtree:true, childList:true});
      document.addEventListener('DOMContentLoaded', function() {
        mo.disconnect();
        document.body.style.overflow = 'scroll';
     });

      function process(mutations) {
          for (var i = 0; i < mutations.length; i++) {
              var nodes = mutations[i].addedNodes;
              for (var j = 0; j < nodes.length; j++) {
                  var n = nodes[j];
                  if (n.nodeType != 1) // only process Node.ELEMENT_NODE
                      continue;
                  doDelete(n.matches(selector) ? [n] : n.querySelectorAll(selector));
              }
          }
      }
      function doDelete(nodes) {
          [].forEach.call(nodes, function(node) { node.remove() });
      }
  }

  // Chrome pre-34
  if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.webkitMatchesSelector;

}());