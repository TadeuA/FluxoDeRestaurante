//Importar modulo externo
const multer = require( 'multer' );
  //Multer lida com requisições multpart from
const path = require( "path" );

//Esportar modulo
module.exports = {
  //Especificando ao multer qual tipo de armazenamento usar e onde armazenar
  storage: multer.diskStorage({
    destination: path.resolve( __dirname, "..","..","upload","profile" ),
    filename: ( req, file, callback ) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      
      callback(null, `${name}-${Date.now()}${ext}`);
    }
  })
}
