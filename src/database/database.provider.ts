import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://0.0.0.0:27017', {
        user: 'root',
        pass: 'P4ssword2022',
        authSource: 'admin',
        dbName: 'bartinder',
      }),
  },
];
