/**
 * This plugin finds the img elements within the provided selector, and uses the
 * css 'clip' property to give the images a specific aspect ratio (140px square
 * by default).
 *
 * The images MUST each be the sole child of some parent element such as a link
 * or a list item, and the images' parents WILL be sized identically to the
 * clipped size of the images.
 *
 * Originally developed as a quick way of using jQuery to convert images retrieved
 * from Flickr to square thumbnails of a nonstandard size.
 *
 * @param object overrides
 *    Default values for thumbHeight and thumbWidth
 * @author Christopher Torgalson <manager@bedlamhotel.com>
 * @version 1.0
 *
 */
$.fn.cropExternalImages = function(overrides) {
  // Set defaults and merge with overridden values:
  var defaults = {
      thumbHeight: 140,
      thumbWidth: 140
    },
    settings = $.extend({}, defaults, overrides);
  // Loop through elements in collection:
  return this.each(function(i,e){
    // Find images in this item of the parent collection and loop through them:
    $(e).find('img').each(function(i,e){
      // Get the current item as a jquery object and get basic information and
      // perform calculations (including creating css clip rule):
      var $current = $(e),
          $width = $current.width(),
          $height = $current.height(),
          clip = {
            top: Math.round(($height - settings.thumbHeight) / 2) + 'px',
            right: Math.round((($width - settings.thumbWidth) / 2 + settings.thumbWidth)) + 'px',
            bottom: Math.round(($height - settings.thumbHeight) / 2 + settings.thumbHeight) + 'px',
            left: Math.round(($width - settings.thumbWidth) / 2) + 'px'
          },
          clipString = 'rect(' + clip.top + ',' + clip.right + ',' + clip.bottom + ',' + clip.left + ')';
      // Do nothing unless our clip settings will actually have some effect:
      if ($width - settings.thumbWidth > 0 || $height - settings.thumbHeight > 0 ) {
        $current
          // Set the required clip and position settings on the individual image:
          .css({
            clip: clipString,
            left: '-' + clip.left,
            position: 'absolute',
            top: '-' + clip.top
          })
          // Adjust the CSS of the image's parent element to match that of the
          // image itself
          .parent().css({
            minHeight: settings.thumbHeight,
            minWidth: settings.thumbWidth
          });        
      }
    });
  });
}; /* $.fn.cropExternalImages */
