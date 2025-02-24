import { PostEntity } from '../entities/post.entity';

export class PostViewer {
  entity: PostEntity;

  setPost(post: PostEntity) {
    this.entity = post;
    delete this.entity?.owner.password;
    return this;
  }

  maskedResponse() {
    return {
      id: this.entity.id,
      title: this.entity.title,
      content: this.entity.content,
      slug: this.entity.slug,
      likes: this.entity.likes.length,
      owner: {
        username: this.entity.owner.username,
        fullname: `${this.entity.owner.firstName} ${this.entity.owner.lastName}`,
        pictureURL: this.entity.owner.pictureURL,
      },
      createdAt: this.entity.createdAt,
      updatedAt: this.entity.updatedAt,
    };
  }

  response() {
    return {
      ...this.maskedResponse(),
      likedBy: this.entity.likes.map((like) => {
        return {
          username: like.user.username,
          fullname: `${like.user.firstName} ${like.user.lastName}`,
          pictureURL: like.user.pictureURL,
        };
      }),
    };
  }
}

type MaskedResponseType = ReturnType<PostViewer['maskedResponse']>;
type ResponseType = ReturnType<PostViewer['response']>;

export type PostViewerType = MaskedResponseType | ResponseType;
