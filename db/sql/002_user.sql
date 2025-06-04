USE itac_ap;

-- users table --
create table if not exists users
(
    user_id       BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique key id for table',
    username      VARCHAR(50)  NOT NULL COMMENT 'User name',
    password_hash VARCHAR(100) NOT NULL COMMENT 'Hashed Password (BCrypt)',
    user_type     INT(2)       NOT NULL COMMENT 'User type (1=admin,2=center)',
    status_cd     VARCHAR(10) DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user   VARCHAR(50)  NOT NULL COMMENT 'Create user',
    create_dt     TIMESTAMP    NOT NULL COMMENT 'Date/time of creation',
    update_user   VARCHAR(50) COMMENT 'Update user',
    update_dt     TIMESTAMP COMMENT 'Date/time of last update'
);

-- users inserts --
INSERT INTO `itac_ap`.`users` (`username`, `password_hash`, `user_type`, `status_cd`, `create_user`, `create_dt`)
VALUES ('admin', '$2b$10$vrkeSkmzvV2oyo35FfVcBefiOoAPWYwNcHi1VNB9eszxYHx305BIy', 1, 'active', 'dan', now());
INSERT INTO `itac_ap`.`users` (`username`, `password_hash`, `user_type`, `status_cd`, `create_user`, `create_dt`)
VALUES ('center', '$2b$10$vrkeSkmzvV2oyo35FfVcBefiOoAPWYwNcHi1VNB9eszxYHx305BIy', 2, 'active', 'dan', now());
