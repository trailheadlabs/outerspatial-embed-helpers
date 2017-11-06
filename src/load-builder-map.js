if (typeof window.OuterSpatialEmbedHelpers !== 'object') {
  console.warning('window.OuterSpatialEmbedHelpers must be an object');
} else if (isNaN(window.OuterSpatialEmbedHelpers.builderMapId)) {
  console.warning('window.OuterSpatialEmbedHelpers.builderMapId must be a number');
} else if (typeof window.OuterSpatialEmbedHelpers.element !== 'object') {
  console.warning('window.OuterSpatialEmbedHelpers.element must be a DOM element object');
} else {
  (function () {
    var builderMapId = window.OuterSpatialEmbedHelpers.builderMapId;
    var element = window.OuterSpatialEmbedHelpers.element;
    var request = new window.XMLHttpRequest();

    request.open('GET', 'https://www.outerspatial.com/builder_maps/' + builderMapId + '.json', true);
    request.onerror = function () {
      console.error('The Builder map could not be retrieved from OuterSpatial');
    };
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);

        if (typeof response === 'object') {
          var config = response.config;

          if (typeof config === 'object') {
            var script = document.createElement('script');

            config.div = element;
            window.OuterSpatial = config;
            script.src = 'https://cdn.outerspatial.com/libs/outerspatial.js/' + config.meta.outerspatialJsVersion + '/outerspatial-bootstrap.min.js';
            document.body.append(script);
          } else {
            console.error('There was a problem parsing the Builder map JSON returned from OuterSpatial');
          }
        } else {
          console.error('There was a problem parsing the Builder map JSON returned from OuterSpatial');
        }
      } else {
        console.error('The Builder map could not be retrieved from OuterSpatial');
      }
    };
    request.send();
  })();
}
