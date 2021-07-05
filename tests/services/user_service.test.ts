import test from 'ava';
import * as sinon from 'sinon';
import UserService from '../../src/service/user_service';
import UserRepository from '../../src/repository/user_repository';
import User from '../../src/entity/models/user_model';
import { HttpError } from '@archisdi/zuu';

test.beforeEach('Initialize New Sandbox Before Each Test', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any): void => {
    t.context.sandbox.restore();
});

test.serial('SUCCESS, getUser case user found', async (t: any): Promise<void> => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const user = new User({
        id: 'id',
        name: 'archie',
        clearance: 5,
        username: 'archie',
        password: 'archie',
        token_validity: '2021-10-10',
        refresh_token: '',
        created_at: '',
        updated_at: '',
    });

    const mockRepository = t.context.sandbox.mock(userRepository).expects('findOne').resolves(user);

    await userService.getUser('id')
        .then(response => {
            t.true(mockRepository.called);
            t.is(response, user);
        });
});

test.serial('FAIL, getUser case user not found', async (t: any): Promise<void> => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const mockRepository = t.context.sandbox.mock(userRepository).expects('findOne').resolves(null);

    await userService.getUser('id')
        .then(response => {
            t.fail();
        })
        .catch(err => {
            t.true(mockRepository.called);
            t.true(err instanceof HttpError.NotFoundError);
        });
});

