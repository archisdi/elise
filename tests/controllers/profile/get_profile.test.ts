import test from 'ava';
import * as sinon from 'sinon';
import ProfileController from '../../../src/controllers/profile_controller';
import UserRepository from '../../../src/repositories/user_sql_repo';
import UserModel from '../../../src/models/user_model';


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
        const mockModel = t.context.sandbox.mock(UserModel).expects('findFromCache').resolves(null);
        const mockUpsert: any = t.context.sandbox.mock(UserModel.repo).expects('findOneOrFail').resolves(new UserModel({ name: 'archie' } as any));

        await profile
            .getProfile(validData, validContext)
            .then((user): void => {
                t.true(mockModel.called);
                t.true(mockUpsert.called);
                t.is(user.name, 'archie');
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
        const mockModel: any = t.context.sandbox.mock(UserModel).expects('findFromCache').resolves(null);
        const mockUpsert: any = t.context.sandbox.mock(UserModel.repo).expects('findOneOrFail').rejects();

        await profile
            .getProfile(validData, validContext)
            .then((): void => {
                t.fail('should throw error');
            })
            .catch((err: any): void => {
                t.true(mockModel.called);
                t.true(mockUpsert.called);
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
