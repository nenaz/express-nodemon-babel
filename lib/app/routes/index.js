import { noteRoutes } from './routes';

export const middleWare = (app, db) => {
    noteRoutes(app, db);
    // Тут, позже, будут и другие обработчики маршрутов 
};
