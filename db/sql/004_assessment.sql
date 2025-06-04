CREATE SCHEMA IF NOT EXISTS itac_ap;
USE itac_ap;

-- assessment
create table assessment
(
    assessment_id              BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Unique key id for table',
    assigned_id                VARCHAR(20) UNIQUE NOT NULL COMMENT 'Assessment identifier (as assigned on creation)',
    sic_cd                     INT                NOT NULL COMMENT 'Standard Industrial Classification (SIC) code (see sic_code)',
    naics_cd                   INT                NOT NULL COMMENT 'NAICS code (see naics_code)',
    variation_id               INT COMMENT 'Variation of the assessment (see variations)',
    assessment_source_id       INT COMMENT 'Assessment source (see assessment_source)',
    center_id                  INT COMMENT 'Center (see center)',
    assessment_days            INT COMMENT '# of assessment days',
    visit_date_1               TIMESTAMP COMMENT 'Date/time of first visit',
    visit_date_2               TIMESTAMP COMMENT 'Date/time of second visit',
    company_name               VARCHAR(200) COMMENT 'Company Name',
    contact_name               VARCHAR(200) COMMENT 'Contact Name',
    email                      VARCHAR(100) COMMENT 'Email address',
    phone                      VARCHAR(20) COMMENT 'Phone number',
    phone_ext                  VARCHAR(10) COMMENT 'Phone number extention',
    addr_1                     VARCHAR(200) COMMENT 'Address line 1',
    addr_2                     VARCHAR(200) COMMENT 'Address line 2',
    addr_3                     VARCHAR(200) COMMENT 'Address line 3',
    city                       VARCHAR(50) COMMENT 'City',
    state_cd                   VARCHAR(2) COMMENT 'State abbreviation',
    postal_cd                  VARCHAR(10) COMMENT 'Postal Code',
    annual_sales               DECIMAL(14, 2) COMMENT 'Annual sales',
    number_of_employees        INT COMMENT 'Number of employees',
    plant_area                 INT COMMENT 'Plant area in units',
    plant_area_unit            VARCHAR(20) COMMENT 'Area unit (default "sqft")',
    principal_products         VARCHAR(255) COMMENT '???',
    annual_production_units    INT COMMENT '# of products produced anually',
    annual_production_hours    INT COMMENT '# of hours spent anually on prodiction ',
    assessment_source_other    VARCHAR(255) COMMENT 'Additional notes about the assessment source',
    assessment_upload_date     TIMESTAMP COMMENT 'Date/time of the assesmnet upload',
    implementation_upload_date TIMESTAMP COMMENT 'Date/time of the implementation upload',
    last_visit_date            TIMESTAMP COMMENT 'Date/time of the last visit',
    budget_year                VARCHAR(4)         NOT NULL COMMENT 'Budget year',
    status_cd                  VARCHAR(10) DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user                VARCHAR(50)        NOT NULL COMMENT 'Create user',
    create_dt                  TIMESTAMP          NOT NULL COMMENT 'Date/time of creation',
    update_user                VARCHAR(50) COMMENT 'Update user',
    update_dt                  TIMESTAMP COMMENT 'Date/time of last update'
);

-- assessment source codes
create table assessment_source
(
    assessment_source_id BIGINT PRIMARY KEY COMMENT 'Unique key id for table',
    name                 VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'Source name (see Reference Data: Asssessment Sources)',
    status_cd            VARCHAR(10)  NOT NULL DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user          VARCHAR(50)  NOT NULL COMMENT 'Create user',
    create_dt            TIMESTAMP    NOT NULL COMMENT 'Date/time of createion',
    update_user          VARCHAR(50) COMMENT 'Update user',
    update_dt            TIMESTAMP COMMENT 'Date/time of last update'
);

-- variation types
create table assessment_variation_type
(
    variation_id BIGINT PRIMARY KEY COMMENT 'Unique key id for table',
    name         VARCHAR(255) NOT NULL COMMENT 'Source name (see Reference Data: Variations)',
    status_cd    VARCHAR(10)  NOT NULL DEFAULT 'active' COMMENT 'Status (active,inactive)',
    create_user  VARCHAR(50)  NOT NULL COMMENT 'Create user',
    create_dt    TIMESTAMP    NOT NULL COMMENT 'Date/time of creation',
    update_user  VARCHAR(50) COMMENT 'Update user',
    update_dt    TIMESTAMP COMMENT 'Date/time of last update'
);

-- ----- INSERTS ------- --

-- assessments
INSERT INTO assessment
(assigned_id, sic_cd, naics_cd,variation_id, assessment_source_id, center_id, assessment_days, visit_date_1, company_name,
 contact_name, email, phone, addr_1, city, state_cd, postal_cd, annual_sales, number_of_employees,
 plant_area, plant_area_unit, annual_production_units, annual_production_hours, last_visit_date, budget_year, status_cd,
 create_user, create_dt)
VALUES ('DB0001', 1, 1,1, 1, 1, 1, now(), 'KIS Solutions', 'Dan Bush', 'dan@foo.com', '555 555-5555', 'Bar Road',
        'Chester Springs', 'PA', '19245', 1000.01, 300, 5000, 'sqft', 1, 2133, now(), '2024', 'active', 'dan', now());
