import BaseRepo from './base_repository';

export default class UserRepo extends BaseRepo {
    private collectionName: string = 'users';

    public async find(conditions: any[]) {
        const firestore = await this.getFirestoreInstance();
        const collection = firestore.collection('users');

        conditions.forEach((condition: string[]) => {
          collection.where(...condition);
        });

        return collection
        .get()
        .then((snapshot: any) => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }

          console.log(snapshot);

          return snapshot.forEach((doc: any) => {
            console.log(doc.id, '=>', doc.data());
          });
        });
    }
}
