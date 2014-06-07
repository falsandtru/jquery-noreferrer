/*
 *
 * jQuery noreferrer
 *
 * ---
 * @version 0.0.0
 * @author falsandtru https://github.com/falsandtru/
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @copyright 2014, falsandtru
 * 
 */
(function(jQuery, window, document, undefined) {
  jQuery.fn.noreferrer = jQuery.noreferrer = function(re) {
    var selector, scope, eventName = 'click.noreferrer';
    re = re instanceof RegExp ? re : /^([\w-]+:)?\/\//i;
    
    if (this instanceof jQuery && this.is('a')) {
      this.unbind(eventName).bind(eventName, handler);
    }
    else {
      selector = selector || 'a';
      scope = this instanceof jQuery && this[0] ? this : jQuery(document);
      scope.undelegate(selector, eventName).delegate(selector, eventName, handler);
    }
    
    function handler(event) {
      var $context = jQuery(event.target), url = $context.attr('href'), userAgent = window.navigator.userAgent.toLowerCase();
      var space = '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　'
                + '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　;'
      
      if (!re.test(url) && !$context.is('[rel~="noreferrer"]') || /^data:/i.test(url) || event.isDefaultPrevented()) {return ;}
      
      // noreferrer support browser
      if (/webkit/i.test(userAgent)) {
        $context[0].rel += !$context.is('[rel~="noreferrer"]') ? ' noreferrer' : '';
      }
      // IE
      else if (~userAgent.indexOf('msie') || ~userAgent.indexOf('trident') && ~userAgent.indexOf('rv:')) {
        if ($context.attr('target') === '_blank'){
          var subwin = window.open('', '', 'location=yes, menubar=yes, toolbar=yes, status=yes, resizable=yes, scrollbars=yes,');
          subwin.document.open();
          subwin.document.write('<meta http-equiv="refresh" content="0;url=' + url + '">');
          subwin.document.close();
        }
        else{
          window.location.hash += '+noreferrer';
          document.open();
          document.write('<meta http-equiv="refresh" content="0;url=' + url + '">');
          document.close();
        }
        event.preventDefault();
      }
      // Firefox
      else {
        if (!url.match(/data:text\/html;charset=utf-8/)) {
          var html = '<script>document.write(\'<meta http-equiv="refresh" content="0;url=' + url + '">\');</script>';
          $context.attr('href', 'data:noreferrer' + space + 'text/html;charset=utf-8,' + encodeURIComponent(html));
        }
      }
    }
  };
})(jQuery, window, window.document, void 0);
