const FRAME_RATE = 10;
const GRID_SIZE = 40;


module.exports = {
  FRAME_RATE,
  GRID_SIZE,
  makeid,
}

function makeid(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

