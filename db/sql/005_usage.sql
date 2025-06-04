CREATE SCHEMA IF NOT EXISTS itac_ap;
USE itac_ap;

-- tables --
drop table if exists usage_type;
create table usage_type
(
    usage_type_id    BIGINT PRIMARY KEY COMMENT 'Unique key id for table',
    usage_group VARCHAR(255) NOT NULL COMMENT 'Usage group (see Reference Data: Usage)',
    category    VARCHAR(255) NOT NULL COMMENT 'Usage category (see Reference Data: Usage)',
    create_user VARCHAR(50)  NOT NULL COMMENT 'Create user',
    create_dt   TIMESTAMP    NOT NULL COMMENT 'Date/time of creation',
    update_user VARCHAR(50) COMMENT 'Update user',
    update_dt   TIMESTAMP COMMENT 'Date/time of last update'
);

-- inserts --
/*
-- Query: SELECT * FROM itac_ap.usage_type
LIMIT 0, 1000

-- Date: 2025-05-23 13:38
*/
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (1,'Energy','Electricity Usage','seth','2025-05-23 14:15:51',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (2,'Energy','Electricity Demand','seth','2025-05-23 14:15:51',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (3,'Energy','Electricity Fees','seth','2025-05-23 14:15:51',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (4,'Energy','Natural Gas','seth','2025-05-23 14:15:52',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (5,'Energy','LPG','seth','2025-05-23 14:15:52',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (6,'Energy','Fuel Oil #1','seth','2025-05-23 14:15:53',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (7,'Energy','Fuel Oil #2','seth','2025-05-23 14:15:53',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (8,'Energy','Fuel Oil #4','seth','2025-05-23 14:15:54',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (9,'Energy','Fuel Oil #6','seth','2025-05-23 14:15:54',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (10,'Energy','Coal','seth','2025-05-23 14:15:55',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (11,'Energy','Wood','seth','2025-05-23 14:15:55',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (12,'Energy','Paper','seth','2025-05-23 14:15:56',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (13,'Energy','Other Gas','seth','2025-05-23 14:15:56',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (14,'Energy','Other Energy','seth','2025-05-23 14:15:56',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (15,'Water/Waste','Water Usage','seth','2025-05-23 14:15:57',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (16,'Water/Waste','Water Disposal','seth','2025-05-23 14:15:57',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (17,'Water/Waste','Other Liquid (non-haz)','seth','2025-05-23 14:15:58',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (18,'Water/Waste','Other Liquid (haz)','seth','2025-05-23 14:15:58',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (19,'Water/Waste','Solid Waste (non-haz)','seth','2025-05-23 14:15:59',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (20,'Water/Waste','Solid Waste (haz)','seth','2025-05-23 14:15:59',NULL,NULL);
INSERT INTO usage_type (usage_type_id,usage_group,category,create_user,create_dt,update_user,update_dt) VALUES (21,'Water/Waste','Gaseous Waste','seth','2025-05-23 14:16:00',NULL,NULL);
