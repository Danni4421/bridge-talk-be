import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as UserSchema from './schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof UserSchema>,
  ) {}

  async create(user: typeof UserSchema.users.$inferInsert) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return await this.database
      .insert(UserSchema.users)
      .values({ ...user, password: hashedPassword });
  }

  async checkUserExistence(email: string) {
    const user = await this.database.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return !!user;
  }
}
