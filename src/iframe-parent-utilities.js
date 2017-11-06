if (typeof window.OuterSpatialEmbedHelpers !== 'object') {
  console.warning('The window.OuterSpatialEmbedHelpers object was not found');
} else if (typeof window.OuterSpatialEmbedHelpers.iframeElement !== 'object') {
  console.warning('The window.OuterSpatialEmbedHelpers.iframeElement property must be a DOM element object');
} else {
  (function () {
    var bodyMargin;
    var bodyOverflow;
    var bodyPadding;
    var containerLeft;
    var containerPosition;
    var containerTop;
    var height;
    var iframe = window.OuterSpatialEmbedHelpers.iframeElement;
    var width;

    function enterFullscreen () {
      bodyMargin = document.body.style.margin;
      bodyOverflow = document.body.style.overflow;
      bodyPadding = document.body.style.padding;
      document.body.style.margin = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.padding = '0';
      containerLeft = iframe.style.left;
      containerPosition = iframe.style.position;
      containerTop = iframe.style.top;
      height = iframe.style.height;
      width = iframe.style.width;
      iframe.style.height = '100%';
      iframe.style.left = '0';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.width = '100%';
    }
    function exitFullscreen () {
      document.body.style.margin = bodyMargin;
      document.body.style.overflow = bodyOverflow;
      document.body.style.padding = bodyPadding;
      iframe.style.height = height;
      iframe.style.left = containerLeft;
      iframe.style.position = containerPosition;
      iframe.style.top = containerTop;
      iframe.style.width = width;
    }

    if (window.location.hash) {
      iframe.src += window.location.hash;
    }

    window.addEventListener('message', function (event) {
      var data = event.data;

      switch (data.id) {
        case 'outerspatial_map_library-enterfullscreen':
          enterFullscreen();
          break;
        case 'outerspatial_map_library-exitfullscreen':
          exitFullscreen();
          break;
        case 'outerspatial_map_library-hashchange':
          window.history.replaceState(undefined, undefined, data.hash);
          break;
      }
    }, false);
  })();
}
