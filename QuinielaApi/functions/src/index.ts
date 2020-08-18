import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { Resultado } from './models/resultado.interface';
//import { Resultado } from './models/resultado.interface';
//import * as bodyParser from 'body-parser';
admin.initializeApp();
const app = express();
app.use(cors());
const DB = admin.firestore();

app.get('/Calendario', async (req, res) => {
    // tslint:disable-next-line: no-void-expression
    const citiesRef = await DB.collection('Calendario').orderBy('Id').limit(9).get().then(snap =>{
      res.status(200).json(snap.docs.map(d=> d.data()));
    });
    console.log(citiesRef);
});

app.get('/contar', async (req, res) => {
    // tslint:disable-next-line: no-void-expression
    const citiesRef = await DB.collection('Calendario').get().then(snap =>{
      res.status(200).json(snap.docs.length);
    });
    console.log(citiesRef);
});
 
app.put('/GuardarResultados', async (req, res) => {
    if(req.body != undefined){
      req.body.forEach(async (element:Resultado) => {
        DB.collection('Resultado').add(element);
      }); 
    }

/* list.forEach(item=> {
DB.collection('Calendario').add(item);

});  */

res.status(200); 
});

app.put('/ActualizarResultadosJornada', async (req, res) => {
  // tslint:disable-next-line: no-floating-promises
  DB.collection('Calendario').where('Jornada', '==', req.body[0].Jornada)
    .get()
    .then((querySnapshot)=> {
      querySnapshot.forEach(doc=> {
        req.body.forEach((element: any) => {
          if(doc.get('Id') == element.IdPartido)
              //console.log(doc.id, ' => ', doc.data());
              // Build doc ref from doc.id
              // tslint:disable-next-line: no-floating-promises
          DB.collection('Calendario').doc(doc.id).update({Resultado: element.Resultado});
        });
      });
  res.status(200).json(querySnapshot); 

    }); 
});

app.put('/CargaInicial1', async (req, res) => {
    /* const body = req.body;
    await admin.firestore().collection('Usuario').doc('Password').update(body);
    res.status(200).send() */

    /* APP.post('/cargarCalendario', async (req, res) => { */
      const cale: any[] = [{
        'Id': 1,
        'IdEquipoLocal': 3,
        'IdEquipoVisitante': 6,
        'Jornada': 1,
        'FechaPartido': '2020-07-23T21:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true
    }, { 'Id': 2, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 17, 'Jornada': 1, 'FechaPartido': '2020-07-24T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 3, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 13, 'Jornada': 1, 'FechaPartido': '2020-07-24T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 4, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 8, 'Jornada': 1, 'FechaPartido': '2020-07-25T19:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': 'E', 'Activo': true }, { 'Id': 5, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 2, 'Jornada': 1, 'FechaPartido': '2020-07-25T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 6, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 16, 'Jornada': 1, 'FechaPartido': '2020-07-25T21:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 7, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 15, 'Jornada': 1, 'FechaPartido': '2020-07-26T12:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 8, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 18, 'Jornada': 1, 'FechaPartido': '2020-07-26T19:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 9, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 1, 'Jornada': 1, 'FechaPartido': '2020-07-27T20:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 10, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 5, 'Jornada': 2, 'FechaPartido': '2020-07-31T19:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 11, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 11, 'Jornada': 2, 'FechaPartido': '2020-07-31T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 12, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 4, 'Jornada': 2, 'FechaPartido': '2020-08-01T17:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 13, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 12, 'Jornada': 2, 'FechaPartido': '2020-08-01T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 14, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 14, 'Jornada': 2, 'FechaPartido': '2020-08-01T21:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 15, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 3, 'Jornada': 2, 'FechaPartido': '2020-08-02T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 16, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 9, 'Jornada': 2, 'FechaPartido': '2020-08-02T17:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 17, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 7, 'Jornada': 2, 'FechaPartido': '2020-08-02T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 18, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 10, 'Jornada': 2, 'FechaPartido': '2020-08-03T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 19, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 15, 'Jornada': 3, 'FechaPartido': '2020-08-06T19:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 20, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 17, 'Jornada': 3, 'FechaPartido': '2020-08-06T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 21, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 1, 'Jornada': 3, 'FechaPartido': '2020-08-07T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 22, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 18, 'Jornada': 3, 'FechaPartido': '2020-08-07T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 23, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 8, 'Jornada': 3, 'FechaPartido': '2020-08-08T19:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 24, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 16, 'Jornada': 3, 'FechaPartido': '2020-08-08T19:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 25, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 13, 'Jornada': 3, 'FechaPartido': '2020-08-08T21:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 26, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 6, 'Jornada': 3, 'FechaPartido': '2020-08-09T12:00:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 27, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 2, 'Jornada': 3, 'FechaPartido': '2020-08-09T19:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 28, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 9, 'Jornada': 4, 'FechaPartido': '2020-08-11T17:00:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 29, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 8, 'Jornada': 4, 'FechaPartido': '2020-08-11T19:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 30, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 13, 'Jornada': 4, 'FechaPartido': '2020-08-11T21:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 31, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 5, 'Jornada': 4, 'FechaPartido': '2020-08-12T17:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 32, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 7, 'Jornada': 4, 'FechaPartido': '2020-08-12T18:00:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 33, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 10, 'Jornada': 4, 'FechaPartido': '2020-08-12T21:00:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 34, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 3, 'Jornada': 4, 'FechaPartido': '2020-08-12T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 35, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 18, 'Jornada': 4, 'FechaPartido': '2020-08-13T19:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 36, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 16, 'Jornada': 4, 'FechaPartido': '2020-08-13T21:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 37, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 12, 'Jornada': 5, 'FechaPartido': '2020-08-14T21:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 38, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 3, 'Jornada': 5, 'FechaPartido': '2020-08-15T17:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 39, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 6, 'Jornada': 5, 'FechaPartido': '2020-08-15T19:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 40, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 14, 'Jornada': 5, 'FechaPartido': '2020-08-15T20:00:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 41, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 11, 'Jornada': 5, 'FechaPartido': '2020-08-15T21:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 42, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 17, 'Jornada': 5, 'FechaPartido': '2020-08-16T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 43, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 2, 'Jornada': 5, 'FechaPartido': '2020-08-16T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 44, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 1, 'Jornada': 5, 'FechaPartido': '2020-08-16T21:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 45, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 4, 'Jornada': 5, 'FechaPartido': '2020-08-17T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 46, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 16, 'Jornada': 6, 'FechaPartido': '2020-08-21T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 47, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 8, 'Jornada': 6, 'FechaPartido': '2020-08-21T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 48, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 15, 'Jornada': 6, 'FechaPartido': '2020-08-22T17:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 49, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 14, 'Jornada': 6, 'FechaPartido': '2020-08-22T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 50, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 10, 'Jornada': 6, 'FechaPartido': '2020-08-22T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 51, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 7, 'Jornada': 6, 'FechaPartido': '2020-08-23T17:30:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 52, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 5, 'Jornada': 6, 'FechaPartido': '2020-08-23T19:30:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 53, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 13, 'Jornada': 6, 'FechaPartido': '2020-08-23T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 54, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 9, 'Jornada': 6, 'FechaPartido': '2020-08-24T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 55, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 18, 'Jornada': 7, 'FechaPartido': '2020-08-28T19:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 56, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 17, 'Jornada': 7, 'FechaPartido': '2020-08-28T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 57, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 6, 'Jornada': 7, 'FechaPartido': '2020-08-29T17:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 58, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 1, 'Jornada': 7, 'FechaPartido': '2020-08-29T19:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, 
    { 'Id': 59, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 12, 'Jornada': 7, 'FechaPartido': '2020-08-29T19:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 60, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 11, 'Jornada': 7, 'FechaPartido': '2020-08-29T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 61, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 4, 'Jornada': 7, 'FechaPartido': '2020-08-30T12:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 62, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 15, 'Jornada': 7, 'FechaPartido': '2020-08-30T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 63, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 2, 'Jornada': 7, 'FechaPartido': '2020-08-31T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, {
        'Id': 64, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 9, 'Jornada': 8,
        'FechaPartido': '2020-09-02T20:30:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true
    }]
/*       await DB.collection('Calendario').add(cale);
  }); */
  
 cale.forEach(item=> {
  DB.collection('Calendario').add(item);

  }); 
    //DB.collection('Calendario').add();
 /*  .then(function(docRef) {
    res.status(200).send( docRef.id); */
  //})
  res.status(200); 
  });

  app.put('/CargaInicial2', async (req, res) => {

      const cale: any[] = [{ 'Id': 65, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 18, 'Jornada': 8, 'FechaPartido': '2020-09-03T19:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 66, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 3, 'Jornada': 8, 'FechaPartido': '2020-09-03T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 67, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 8, 'Jornada': 8, 'FechaPartido': '2020-09-04T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 68, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 10, 'Jornada': 8, 'FechaPartido': '2020-09-04T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 69, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 16, 'Jornada': 8, 'FechaPartido': '2020-09-04T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 70, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 13, 'Jornada': 8, 'FechaPartido': '2020-09-05T17:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 71, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 5, 'Jornada': 8, 'FechaPartido': '2020-09-05T19:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 72, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 7, 'Jornada': 8, 'FechaPartido': '2020-09-05T21:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 73, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 11, 'Jornada': 9, 'FechaPartido': '2020-09-08T17:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 74, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 6, 'Jornada': 9, 'FechaPartido': '2020-09-08T19:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 75, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 2, 'Jornada': 9, 'FechaPartido': '2020-09-08T19:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 76, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 15, 'Jornada': 9, 'FechaPartido': '2020-09-08T21:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 77, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 1, 'Jornada': 9, 'FechaPartido': '2020-09-08T21:00:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 78, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 17, 'Jornada': 9, 'FechaPartido': '2020-09-09T17:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 79, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 12, 'Jornada': 9, 'FechaPartido': '2020-09-09T19:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 80, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 4, 'Jornada': 9, 'FechaPartido': '2020-09-09T20:00:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 81, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 14, 'Jornada': 9, 'FechaPartido': '2020-09-09T21:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 82, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 7, 'Jornada': 10, 'FechaPartido': '2020-09-11T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 83, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 13, 'Jornada': 10, 'FechaPartido': '2020-09-11T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 84, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 9, 'Jornada': 10, 'FechaPartido': '2020-09-12T17:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 85, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 16, 'Jornada': 10, 'FechaPartido': '2020-09-12T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 86, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 18, 'Jornada': 10, 'FechaPartido': '2020-09-12T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 87, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 3, 'Jornada': 10, 'FechaPartido': '2020-09-13T12:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 88, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 8, 'Jornada': 10, 'FechaPartido': '2020-09-13T19:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 89, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 5, 'Jornada': 10, 'FechaPartido': '2020-09-13T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 90, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 10, 'Jornada': 10, 'FechaPartido': '2020-09-14T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 91, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 13, 'Jornada': 11, 'FechaPartido': '2020-09-18T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 92, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 6, 'Jornada': 11, 'FechaPartido': '2020-09-18T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 93, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 5, 'Jornada': 11, 'FechaPartido': '2020-09-18T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 94, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 12, 'Jornada': 11, 'FechaPartido': '2020-09-19T17:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 95, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 15, 'Jornada': 11, 'FechaPartido': '2020-09-19T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 96, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 7, 'Jornada': 11, 'FechaPartido': '2020-09-19T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 97, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 16, 'Jornada': 11, 'FechaPartido': '2020-09-20T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 98, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 10, 'Jornada': 11, 'FechaPartido': '2020-09-20T19:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 99, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 14, 'Jornada': 11, 'FechaPartido': '2020-09-21T20:30:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 100, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 15, 'Jornada': 12, 'FechaPartido': '2020-09-25T19:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 101, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 2, 'Jornada': 12, 'FechaPartido': '2020-09-25T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 102, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 9, 'Jornada': 12, 'FechaPartido': '2020-09-26T17:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 103, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 11, 'Jornada': 12, 'FechaPartido': '2020-09-26T19:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 104, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 17, 'Jornada': 12, 'FechaPartido': '2020-09-26T21:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 105, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 8, 'Jornada': 12, 'FechaPartido': '2020-09-27T17:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 106, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 4, 'Jornada': 12, 'FechaPartido': '2020-09-27T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 107, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 1, 'Jornada': 12, 'FechaPartido': '2020-09-27T20:45:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 108, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 18, 'Jornada': 12, 'FechaPartido': '2020-09-28T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 109, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 16, 'Jornada': 13, 'FechaPartido': '2020-10-02T19:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 110, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 12, 'Jornada': 13, 'FechaPartido': '2020-10-02T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 111, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 11, 'Jornada': 13, 'FechaPartido': '2020-10-03T17:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 112, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 3, 'Jornada': 13, 'FechaPartido': '2020-10-03T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 113, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 14, 'Jornada': 13, 'FechaPartido': '2020-10-03T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 114, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 5, 'Jornada': 13, 'FechaPartido': '2020-10-04T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 115, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 10, 'Jornada': 13, 'FechaPartido': '2020-10-04T19:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 116, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 7, 'Jornada': 13, 'FechaPartido': '2020-10-04T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 117, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 9, 'Jornada': 13, 'FechaPartido': '2020-10-05T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 118, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 15, 'Jornada': 14, 'FechaPartido': '2020-10-15T21:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 119, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 4, 'Jornada': 14, 'FechaPartido': '2020-10-16T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 120, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 6, 'Jornada': 14, 'FechaPartido': '2020-10-16T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 121, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 13, 'Jornada': 14, 'FechaPartido': '2020-10-17T17:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, 
      { 'Id': 122, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 2, 'Jornada': 14, 'FechaPartido': '2020-10-17T19:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 123, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 17, 'Jornada': 14, 'FechaPartido': '2020-10-17T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 124, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 18, 'Jornada': 14, 'FechaPartido': '2020-10-18T12:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 125, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 12, 'Jornada': 14, 'FechaPartido': '2020-10-18T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 126, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 1, 'Jornada': 14, 'FechaPartido': '2020-10-19T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, {
          'Id': 127, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 8, 'Jornada': 15, 'FechaPartido': '2020-10-23T19:30:00', 'Estadio': ' Cuauhtémoc',
          'Resultado': '', 'Activo': true
      }, { 'Id': 128, 'IdEquipoLocal': 9, 'IdEquipoVisitante': 10, 'Jornada': 15, 'FechaPartido': '2020-10-23T20:30:00', 'Estadio': ' Estadio Mazatlán', 'Resultado': '', 'Activo': true }, { 'Id': 129, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 11, 'Jornada': 15, 'FechaPartido': '2020-10-24T17:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 130, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 6, 'Jornada': 15, 'FechaPartido': '2020-10-24T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 131, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 2, 'Jornada': 15, 'FechaPartido': '2020-10-24T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 132, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 4, 'Jornada': 15, 'FechaPartido': '2020-10-25T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 133, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 5, 'Jornada': 15, 'FechaPartido': '2020-10-25T17:30:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 134, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 3, 'Jornada': 15, 'FechaPartido': '2020-10-25T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 135, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 14, 'Jornada': 15, 'FechaPartido': '2020-10-26T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }, { 'Id': 136, 'IdEquipoLocal': 3, 'IdEquipoVisitante': 9, 'Jornada': 16, 'FechaPartido': '2020-10-29T21:00:00', 'Estadio': ' Alfonso Lastras Ramírez', 'Resultado': '', 'Activo': true }, { 'Id': 137, 'IdEquipoLocal': 11, 'IdEquipoVisitante': 18, 'Jornada': 16, 'FechaPartido': '2020-10-30T19:30:00', 'Estadio': ' Victoria', 'Resultado': '', 'Activo': true }, { 'Id': 138, 'IdEquipoLocal': 4, 'IdEquipoVisitante': 12, 'Jornada': 16, 'FechaPartido': '2020-10-30T19:00:00', 'Estadio': ' Caliente', 'Resultado': '', 'Activo': true }, { 'Id': 139, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 15, 'Jornada': 16, 'FechaPartido': '2020-10-30T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 140, 'IdEquipoLocal': 2, 'IdEquipoVisitante': 13, 'Jornada': 16, 'FechaPartido': '2020-10-31T17:00:00', 'Estadio': ' Jalisco', 'Resultado': '', 'Activo': true }, { 'Id': 141, 'IdEquipoLocal': 14, 'IdEquipoVisitante': 7, 'Jornada': 16, 'FechaPartido': '2020-10-31T19:00:00', 'Estadio': ' Olímpico Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 142, 'IdEquipoLocal': 10, 'IdEquipoVisitante': 5, 'Jornada': 16, 'FechaPartido': '2020-10-31T21:00:00', 'Estadio': ' Estadio BBVA', 'Resultado': '', 'Activo': true }, { 'Id': 143, 'IdEquipoLocal': 1, 'IdEquipoVisitante': 17, 'Jornada': 16, 'FechaPartido': '2020-11-01T17:30:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 144, 'IdEquipoLocal': 8, 'IdEquipoVisitante': 16, 'Jornada': 16, 'FechaPartido': '2020-11-02T21:00:00', 'Estadio': ' Nou Camp', 'Resultado': '', 'Activo': true }, { 'Id': 145, 'IdEquipoLocal': 13, 'IdEquipoVisitante': 3, 'Jornada': 17, 'FechaPartido': '2020-11-06T19:30:00', 'Estadio': ' Cuauhtémoc', 'Resultado': '', 'Activo': true }, { 'Id': 146, 'IdEquipoLocal': 6, 'IdEquipoVisitante': 1, 'Jornada': 17, 'FechaPartido': '2020-11-06T20:30:00', 'Estadio': ' Olímpico Benito Juárez', 'Resultado': '', 'Activo': true }, { 'Id': 147, 'IdEquipoLocal': 7, 'IdEquipoVisitante': 10, 'Jornada': 17, 'FechaPartido': '2020-11-07T17:00:00', 'Estadio': ' Estadio AKRON', 'Resultado': '', 'Activo': true }, { 'Id': 148, 'IdEquipoLocal': 17, 'IdEquipoVisitante': 2, 'Jornada': 17, 'FechaPartido': '2020-11-07T19:00:00', 'Estadio': ' Universitario', 'Resultado': '', 'Activo': true }, { 'Id': 149, 'IdEquipoLocal': 5, 'IdEquipoVisitante': 14, 'Jornada': 17, 'FechaPartido': '2020-11-07T21:00:00', 'Estadio': ' Azteca', 'Resultado': '', 'Activo': true }, { 'Id': 150, 'IdEquipoLocal': 18, 'IdEquipoVisitante': 8, 'Jornada': 17, 'FechaPartido': '2020-11-08T12:00:00', 'Estadio': ' Nemesio Diez', 'Resultado': '', 'Activo': true }, { 'Id': 151, 'IdEquipoLocal': 16, 'IdEquipoVisitante': 9, 'Jornada': 17, 'FechaPartido': '2020-11-08T19:00:00', 'Estadio': ' TSM Corona', 'Resultado': '', 'Activo': true }, { 'Id': 152, 'IdEquipoLocal': 15, 'IdEquipoVisitante': 4, 'Jornada': 17, 'FechaPartido': '2020-11-08T21:00:00', 'Estadio': ' La Corregidora', 'Resultado': '', 'Activo': true }, { 'Id': 153, 'IdEquipoLocal': 12, 'IdEquipoVisitante': 11, 'Jornada': 17, 'FechaPartido': '2020-11-09T21:00:00', 'Estadio': ' Hidalgo', 'Resultado': '', 'Activo': true }]

  
 cale.forEach(item=> {
  DB.collection('Calendario').add(item);

  }); 
  res.status(200); 

  });



  exports.user= functions.https.onRequest(app);

  

  /*import * as functions from 'firebase-functions';
  import * as express from 'express';
  import * as admin from 'firebase-admin';
  import * as bodyParser from 'body-parser';
  //import { firebaseConfig } from 'firebase-functions';
  
  admin.initializeApp(functions.config().firebase);
  const APP = express();
  const MAIN = express();
  
  MAIN.use('QMApi', APP);
  MAIN.use(bodyParser.json());
  MAIN.use(bodyParser.urlencoded({ extended: true }));
  
  const DB = admin.firestore();
  export const WEBAPI = functions.https.onRequest(MAIN);
  
  APP.post('cargarCalendario', async (req, res) => {
      const cale = {
          Id: 1,
          IdEquipoLocal: 3,
          IdEquipoVisitante: 6,
          Jornada: 1,
          FechaPartido: '2020-07-23T21:00:00', 
          Estadio: ' Alfonso Lastras Ramírez', 
          Resultado: '', 
          Activo: true
      };
      await DB.collection('Calendario').add(cale);
      return res.json('chido');
  });
  
  */
  
  // // Start writing Firebase Functions
  // // https://firebase.google.com/docs/functions/typescript
  //
  // export const helloWorld = functions.https.onRequest((request, response) => {
  //   functions.logger.info('Hello logs!', {structuredData: true});
  //   response.send('Hello from Firebase!');
  // });
  