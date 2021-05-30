import Person from '../../typings/outbound/person';

export interface StarwarsOutboundService {
    getPersonById(id: number): Promise<Person>;
}

export default StarwarsOutboundService;
