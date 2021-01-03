USE simulation_storage_db;

CREATE TABLE IF NOT EXISTS sim_data(
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    character_name VARCHAR(20) NOT NULL,
    region_name VARCHAR(5) NOT NULL,
    realm_name VARCHAR(20) NOT NULL,
    sim_type VARCHAR(50) NOT NULL,
    sim_dps int(6) NOT NULL,
    character_class VARCHAR(12) NOT NULL,
    character_spec VARCHAR(12) NOT NULL,
    sim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
