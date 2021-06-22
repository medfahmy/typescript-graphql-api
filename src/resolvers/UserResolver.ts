import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entity/User";

@InputType()
class UserInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;
}

@InputType()
class UserUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  age?: number;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("options", () => UserInput) options: UserInput
    // @Arg("name" /*() => String, { nullable: true }*/) name: string /*| nulli*/,
    // @Arg("age", () => Int) age: number
  ) {
    const user = await User.create(options).save();
    return user;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => UserUpdateInput) input: UserUpdateInput
  ) {
    await User.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    await User.delete({ id });
    return true;
  }
}
