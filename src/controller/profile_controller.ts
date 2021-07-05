import { Context } from 'src/typings/common';
import { Controller as BaseController, RequestData } from '@archisdi/zuu';
import API_ROUTE from '../entity/constant/api_route';
import CLEARANCE from '../entity/constant/clearance';
import AuthMiddleware from '../middleware/jwt_auth';
import StarwarsOutboundService from '../service/interfaces/starwars_outbound_service';
import UserService from '../service/interfaces/user_service';

export default class ProfileController extends BaseController {
    public constructor(
        private userService: UserService,
        private starWarsOutboundService: StarwarsOutboundService
    ) {
        super({ path: API_ROUTE.PROFILE, middleware: AuthMiddleware(CLEARANCE.ADMIN) });
    }

    public async getProfile(data: RequestData, context: Context): Promise<any> {
        const user = await this.userService.getUser(context.user_id);
        return user.toJson({ removeHidden: true });
    }

    public async getStarwarsProfile(data: RequestData, context: Context): Promise<any> {
        const person = await this.starWarsOutboundService.getPersonById(data.params.id);
        return {
            name: person.name,
            height: person.height,
            mass: person.mass,
        };
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getProfile.bind(this), { cache: true });
        this.addRoute('get', '/starwars/:id', this.getStarwarsProfile.bind(this));

        /** nested controllers */
        // this.addChildController(Controller);
    }
}
