CREATE SCHEMA IF NOT EXISTS itac_ap;
USE itac_ap;

-- center init
create table if not exists center
(
    center_id     BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique key id for table',
    name          VARCHAR(255) NOT NULL COMMENT 'The short code for the brand',
    symbol        VARCHAR(8)   NOT NULL COMMENT 'The name of the brand',
    award_number  VARCHAR(30) COMMENT 'Award number (assigned by DOE)',
    director_name VARCHAR(100) COMMENT 'Director name',
    status_cd     VARCHAR(15)  NOT NULL DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user   VARCHAR(50)  NOT NULL COMMENT 'Create user',
    create_dt     TIMESTAMP    NOT NULL COMMENT 'Date/time of creation',
    update_user   VARCHAR(50) COMMENT 'Update user',
    update_dt     TIMESTAMP COMMENT 'Date/time of last update'
);

-- centers data
INSERT INTO itac_ap.center (name, symbol, award_number, director_name, status_cd, create_user,
                                create_dt)
VALUES ('Test Center', 'TC', 'AWD001', 'Mr. Director', 'active', 'dan', NOW());