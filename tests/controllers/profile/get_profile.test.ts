import test from 'ava';
import * as sinon from 'sinon';
import { HttpError } from 'tymon';

/** */
import UserRepository from '../../../src/repositories/user_sql_repo';
import ProfileController from '../../../src/controllers/profile_controller';

/** */
const validContext = {
    username: 'archie',
    user_id: '123321'
};

const validData = {
    query: {},
    params: {},
    body: {}
};

test.serial(
    'SUCCESS, should retrieve profile data',
    async (t: any): Promise<void> => {
        const profile = new ProfileController();
        const mockUpsert: any = t.context.sandbox.mock(UserRepository.prototype).expects('findOne').resolves({
            name: 'archie',
            profesion: 'software engineer'
        });

        await profile
            .getProfile(validData, validContext)
            .then((): void => {
                t.true(mockUpsert.called);
            })
            .catch((err: any): void => {
                t.fail(err.message);
            });
    }
);

test.serial(
    'FAIL, should throw error if no user data found',
    async (t: any): Promise<void> => {
        const profile = new ProfileController();
        const mockUpsert: any = t.context.sandbox.mock(UserRepository.prototype).expects('findOne').resolves(null);

        await profile
            .getProfile(validData, validContext)
            .then((): void => {
                t.fail('should throw error');
            })
            .catch((err: any): void => {
                t.true(mockUpsert.called);
                t.true(err.status === 404);
            });
    }
);

test.before('Initialize error handler', (t: any): void => {
    // HttpError.initialize();
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any): void => {
    t.context.sandbox.restore();
});
