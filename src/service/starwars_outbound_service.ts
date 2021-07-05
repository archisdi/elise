import { OutboundService } from '@archisdi/zuu';
import Person from '../typings/outbound/person';
import StarwarsOutboundService from './interfaces/starwars_outbound_service';

export class StarwarsOutboundServiceImpl extends OutboundService implements StarwarsOutboundService {
    constructor(){
        super(process.env.SERVICE_STARWARS_URL as string);
    }

    async getPersonById(id: number): Promise<Person> {
        return this.caller.get(`/people/${id}?format=json`)
            .then(response => response.data);
    }

}

export default StarwarsOutboundServiceImpl;
