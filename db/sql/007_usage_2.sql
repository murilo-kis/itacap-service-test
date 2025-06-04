USE itac_ap;

drop table if exists assessment_usage;
create table assessment_usage
(
    usage_id      BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'Unique key id for table',
    usage_type    BIGINT         NOT NULL COMMENT 'See assessment_usage_type',
    assessment_id BIGINT         NOT NULL COMMENT 'Which assessment does this usage belong to?',
    consumption   DECIMAL(14, 3) NOT NULL COMMENT '# units consumed',
    cost          DECIMAL(12, 2) NOT NULL COMMENT 'The cost of the consumption',
    unit          VARCHAR(10)    NOT NULL COMMENT 'Unit of cost/consumption like kWh, MMBtu',
    status_cd     VARCHAR(15)    NOT NULL DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user   VARCHAR(50)    NOT NULL COMMENT 'Create user',
    create_dt     TIMESTAMP      NOT NULL COMMENT 'Date/time of creation',
    update_user   VARCHAR(50) COMMENT 'Update user',
    update_dt     TIMESTAMP COMMENT 'Date/time of last update'
);

insert into assessment_usage (consumption, usage_type, assessment_id, cost, unit, create_user, create_dt, update_user, update_dt)
values (30, 1, 1,300, 'kWh', 'David Black', now(), 'David Black', now())