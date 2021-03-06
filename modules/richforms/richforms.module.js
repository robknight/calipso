/**
 * Calipso is included in every module
 */
var calipso = require("../../lib/calipso");

/**
 * Turns form date elements into jQUery UI Datepickers
 * REQUIRES jQuery & jQuery UI to be included in the theme ...
 */
exports = module.exports = {init: init, route: route};

/**
 * Template module
 */
function route(req, res, module, app, next) {

  /**
   * Routes
   */
  module.router.route(req, res, next);
  
};

function init(module, app, next) {
  
  
  // Any pre-route config
  calipso.lib.step(
    function defineRoutes() {
    
      // Add a route to every page, ideally just do it on form pages, but can't tell atm      
      module.router.addRoute(/.*/, allPages, {end:false, template:'datepicker.script', block:'scripts.richforms.datepicker'}, this.parallel());
      module.router.addRoute(/.*/, allPages, {end:false, template:'markitup.script', block:'scripts.richforms.markitup'}, this.parallel());
      // module.router.addRoute(/^(\/richforms\/).*/, staticRender, {}, this.parallel());
      app.use(calipso.lib.express.static(__dirname + '/static'));
              
    },
    function done() {
            
      // Test over-riding a form element
      calipso.form.render_tag_date = function(field,value) {      
        
        // Default value to current date
        var dateValue = value ? value : new Date();
                
        // The actual date field that is visible
        var tagOutput = '<input class="jquery-ui-datepicker"'
                     + ' id="date-' + field.name.replace('[','_').replace(']','') + '"'
                     + ' value="' + calipso.date.formatDate( 'MM, dd yy',dateValue) + '"'                     
                     + ' />';                                  
        
        tagOutput += '<input type="hidden" name="' + field.name + '[date]"'
                     + ' id="date-' + field.name.replace('[','_').replace(']','') + '-value"'
                     + ' value="' + calipso.date.formatDate( 'MM, dd yy',dateValue) + '"'
                     + ' />';
                                                       
        return tagOutput;
                             
      }
      
      // TODO : ADD TIME PICKER             
              
      // Any schema configuration goes here
      next();
      
    }
  );
  
  
};

/**
 * Every page block function
 */
function allPages(req, res, template, block, next) {
  
  calipso.theme.renderItem(req, res, template, block, {});
  next();
  
};

/**
 * Every page block function
 */
function staticRender(req, res, template, block, next) {
  
  /**
  var relativePath = req.url.replace(/^(\/richforms\/)/,'');  
  
  calipso.lib.path.exists(__dirname + "/" + relativePath, function(exists) {      
      if(exists) {        
        calipso.lib.fs.readFile(__dirname + "/" + relativePath, function (err, data) {                   
            if(err) {
              res.send("<!-- Module searching for " + relativePath + " but could not read file : " + err.message + "--->");
            } else {
              
              res.send(data);  
            }            
        });        
      } else {
        res.send("<!-- Module searching for " + relativePath + " but not found --->");   
      }
              
  });  
  **/
    
};


