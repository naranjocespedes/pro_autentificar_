const { isMemberExpressionNode } = require("@vue/compiler-core");
const express = require("express"); //se importa para ser utilizado
const jwt = require("jsonwebtoken"); //se importa para ser utilizado
const keys = require('./configs/configs');
const app = express(); //se ejecuta la funcion isMemberExpressionNode, creando un app

app.set('key', keys.key);//se hace referencia a la clave
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get("/", (req, res)=>{ // se usa el metodo get y una ruta, este toma dos parametros

    res.json({

        mensaje: "EJECUCION DEL PROGRAMA"

    });
});

app.get('/ingre',(req, res) => {
    res.send(`<html>
      <head>
        <title>INICIO</title>
      </head>
      <body>
        <from method="POST" action="/login">
          Nombre de usuario: <input  type="text" name="text"><br/>
          contraseña: <input class=caja.azul type="password" name="password"><br/>
          <input type="button" value="SESION"/>
        </from>
      </body>
  </html>`
);
 });


app.post("/login", (req, res)=>{ // se usa para ingresar a la validacion
    if (req.body.usuario == 'admin'&& req.body.pass == '123') {
        const payload={
            check:true
        };
        const token = jwt.sign(payload, app.get('key'),{
            expiresIn:'1m'
        });
        res.json({
            mensaje:'AUTENTICACION EXITOSA',
            token: token
        });
    }else{
        res.json({
            mensaje:'Usuario y/o contraseña mala'
        })

    }

});






const verificarToken = express.Router();

verificarToken.use((req, res, next)=>{
    
     let token = req.headers['x-access-token'] || req.headers['authorization'];
     //console.log(token);
     if (!token) {
        res.status(401).send({
            error: 'Es necesario un token'
        })
        return
        
     }
     if (token.startsWith('Bearer')) {
        token = token.slice(7, token.length);
     }

     if (token) {
        jwt.verify(token, app.get('key'), (error, decoded)=>{
            if (error) {
                res.json({
                    mensaje: "EL TOKEN NO ES VALIDO",
                    
                })
            }else{
    
                req.decoded = decoded;
                next();
            }
        })

     }

});


app.get("/info", verificarToken,(req, res)=>{ 
   
    res.json('INFORMACION ENTREGADA');


});

app.listen(3000, function(){
    //aqui se pone el puerto donde se va a ejecutar la app
    console.log('Servidor UP en http://localhost:3000');
});