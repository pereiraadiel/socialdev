import { LikedPostEntity } from './../entities/likedPost.entity';

export const LIKED_POST_REPOSITORY = 'LIKED_POST_REPOSITORY';

export interface LikedPostRepository {
  create(userId: string, postId: string): Promise<LikedPostEntity>;
  findOneByUserIdAndPostId(
    userId: string,
    postId: string,
  ): Promise<LikedPostEntity | null>;
  findManyByPostId(postId: string): Promise<LikedPostEntity[]>; // get all users who liked postId
  findManyByUserId(userId: string): Promise<LikedPostEntity[]>; // get all posts liked by userId
  delete(userId: string, postId: string): Promise<void>;
}
