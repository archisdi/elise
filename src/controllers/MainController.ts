import { Router, Request, Response } from 'express';

const router: Router = Router();

const index = router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

export default {
    index
};