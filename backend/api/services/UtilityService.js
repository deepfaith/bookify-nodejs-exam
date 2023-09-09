const { DateTime } = require("luxon");
var UtilityService = {

      DateFromMillis(epoch) {
        if (!epoch) {
          return null
        }
      
        if (typeof epoch === 'string') {
          epoch = parseInt(epoch)
        }
        return DateTime.fromMillis(epoch)  
  
  }
}
module.exports = UtilityService;
  