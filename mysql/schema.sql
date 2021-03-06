CREATE TABLE `User` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `email`                   VARCHAR(255) UNIQUE NOT NULL,
  `display_name`            VARCHAR(255),
  `avatar_url`              VARCHAR(255),
  `active`                  BOOLEAN NOT NULL DEFAULT(1),
  `report_flag`             BOOLEAN NOT NULL DEFAULT(0),
  `last_accessed`           TIMESTAMP NOT NULL DEFAULT(NOW()),
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `rating`                  FLOAT(5,4)
);

CREATE TABLE `UserPassword` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`                 INTEGER UNIQUE NOT NULL,
  `password_hash`           VARCHAR(255) NOT NULL,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `updated_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `GitHubOAuth` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`                 INTEGER UNIQUE NOT NULL,
  `github_user_id`          VARCHAR(255) NOT NULL,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Image` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `url`                     VARCHAR(255) UNIQUE NOT NULL,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Item` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `item_name`               VARCHAR(255) NOT NULL,
  `item_condition`          VARCHAR(15) NOT NULL,
  `item_age`                SMALLINT NOT NULL, -- months
  `item_status`             BOOLEAN NOT NULL DEFAULT(1),
  `lender_id`               INTEGER NOT NULL,

  FOREIGN KEY (`lender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Post` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `title`                   VARCHAR(255) NOT NULL,
  `rate`                    DECIMAL(11,2) DEFAULT(0),
  `post_description`        VARCHAR(255),
  `location`                VARCHAR(255),
  `duration`                TIMESTAMP NOT NULL DEFAULT(NOW() + INTERVAL 1 MONTH),
  `views`                   INTEGER NOT NULL DEFAULT(0), -- increment on vew
  `likes`                   INTEGER NOT NULL DEFAULT(0), -- aggregated
  `report_flag`             BOOLEAN NOT NULL DEFAULT(0),
  `user_id`                 INTEGER NOT NULL,
  `item_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE
);

CREATE TABLE `PostImage` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW()),
  `post_id`                 INTEGER NOT NULL,
  `image_id`                INTEGER NOT NULL,

  UNIQUE (`post_id`, `image_id`),
  FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Tag` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name`                    VARCHAR(255) UNIQUE NOT NULL,
  `total_count`             INTEGER NOT NULL DEFAULT(0) -- aggregated
);

CREATE TABLE `PostTag` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `post_id`                 INTEGER NOT NULL,
  `tag_id`                  INTEGER NOT NULL,

  UNIQUE (`post_id`,`tag_id`),
  FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ItemTag` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `item_id`                 INTEGER NOT NULL,
  `tag_id`                  INTEGER NOT NULL,

  FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE CASCADE
);

CREATE TABLE `List` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name`                    VARCHAR(255) NOT NULL,
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `PostList` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `post_id`                 INTEGER NOT NULL,
  `list_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`list_id`) REFERENCES `List`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ItemList` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `item_id`                 INTEGER NOT NULL,
  `list_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`list_id`) REFERENCES `List`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Message` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `message`                 VARCHAR(2550),
  `created_on`              TIMESTAMP NOT NULL DEFAULT(NOW())
);

CREATE TABLE `MessageImage` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `message_id`              INTEGER NOT NULL,
  `image_id`                INTEGER NOT NULL,

  FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`)
);

CREATE TABLE `UserMessage` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `message_id`              INTEGER NOT NULL,
  `sender_id`               INTEGER NOT NULL,
  `receiver_id`             INTEGER NOT NULL,
  `receiver_read`           BOOLEAN NOT NULL DEFAULT(0),

  FOREIGN KEY (`message_id`) REFERENCES `Message`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `Rating` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW()),
  `message`                 VARCHAR(2550),
  `rating`                  FLOAT(5,4) NOT NULL,
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`)
);

CREATE TABLE `UserRating` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `user_id`                 INTEGER NOT NULL,
  `rating_id`               INTEGER NOT NULL,

  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`rating_id`) REFERENCES `Rating`(`id`) ON DELETE CASCADE
);

CREATE TABLE `PostRating` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `post_id`                 INTEGER NOT NULL,
  `rating_id`               INTEGER NOT NULL,

  FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`rating_id`) REFERENCES `Rating`(`id`) ON DELETE CASCADE
);

CREATE TABLE `History` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW()),
  `item_id`                 INTEGER NOT NULL,
  `lender_id`               INTEGER NOT NULL,
  `renter_id`               INTEGER NOT NULL,
  `lender_rating`           INTEGER,
  `renter_rating`           INTEGER,

  FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`lender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`renter_id`) REFERENCES `User`(`id`)
);

CREATE TABLE `PostLike` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW()),
  `post_id`                 INTEGER NOT NULL,
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `ListLike` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW()),
  `list_id`                 INTEGER NOT NULL,
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`list_id`) REFERENCES `List`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE
);

CREATE TABLE `UserLike` (
  `id`                      INTEGER PRIMARY KEY AUTO_INCREMENT,
  `timestamp`               TIMESTAMP NOT NULL DEFAULT(NOW()),
  `liked_user`              INTEGER NOT NULL,
  `user_id`                 INTEGER NOT NULL,

  FOREIGN KEY (`liked_user`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) On DELETE CASCADE
);
