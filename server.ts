import app from './src/application/app';
import http from 'http';
import connectionDB from './src/infrastructure/config/typeorm';

app.set('port', process.env.PORT ?? 3000);

const createAndStartServer = () => {
    const server = http.createServer(app).listen(app.get('port'), function () {
        console.info('###########################################################');
        console.info(`#            Server is listening on port: ${app.get('port')}            #`);
        console.info('###########################################################');
    });
};

Promise.all([connectionDB.initialize()])
.then(() => createAndStartServer())
.catch((err) => {
    console.error('!!!! Error connecting to database !!!!');
    console.error(err);
});