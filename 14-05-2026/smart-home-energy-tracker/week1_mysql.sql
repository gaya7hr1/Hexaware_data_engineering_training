CREATE DATABASE IF NOT EXISTS smart_energy;
USE smart_energy;

CREATE TABLE IF NOT EXISTS rooms (
    room_id     INT AUTO_INCREMENT PRIMARY KEY,
    room_name   VARCHAR(100) NOT NULL UNIQUE,
    floor       INT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
    device_id   VARCHAR(10)  PRIMARY KEY,
    device_name VARCHAR(100) NOT NULL,
    room_id     INT          NOT NULL,
    device_type VARCHAR(100),
    status      VARCHAR(20)  DEFAULT 'active',
    created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

CREATE TABLE IF NOT EXISTS energy_logs (
    log_id      INT AUTO_INCREMENT PRIMARY KEY,
    device_id   VARCHAR(10)    NOT NULL,
    energy_kwh  DECIMAL(10, 3) NOT NULL,
    log_time    DATETIME       NOT NULL,
    status      VARCHAR(20),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(device_id)
);


INSERT INTO rooms (room_name, floor) VALUES
    ('Living Room', 1),
    ('Kitchen',     1),
    ('Bedroom',     2),
    ('Bathroom',    2),
    ('Garage',      0);

INSERT INTO devices (device_id, device_name, room_id, device_type) VALUES
    ('D001', 'Air Conditioner', 3, 'HVAC'),
    ('D002', 'Refrigerator',    2, 'Appliance'),
    ('D003', 'Washing Machine', 5, 'Appliance'),
    ('D004', 'Television',      1, 'Entertainment'),
    ('D005', 'Microwave',       2, 'Appliance');

INSERT INTO energy_logs (device_id, energy_kwh, log_time, status) VALUES
    ('D001', 1.82, '2025-04-01 00:00:00', 'active'),
    ('D002', 0.45, '2025-04-01 01:00:00', 'active'),
    ('D003', 0.91, '2025-04-01 02:00:00', 'idle'),
    ('D004', 0.12, '2025-04-01 03:00:00', 'active'),
    ('D005', 0.08, '2025-04-01 04:00:00', 'idle'),
    ('D001', 2.10, '2025-04-02 00:00:00', 'active'),
    ('D002', 0.42, '2025-04-02 01:00:00', 'active'),
    ('D003', 0.00, '2025-04-02 02:00:00', 'off'),
    ('D004', 0.15, '2025-04-02 03:00:00', 'active'),
    ('D005', 0.10, '2025-04-02 04:00:00', 'active');


SELECT * FROM rooms;
SELECT * FROM devices;
SELECT * FROM energy_logs;

SELECT
    d.device_id,
    d.device_name,
    r.room_name,
    el.energy_kwh,
    el.log_time,
    el.status
FROM energy_logs el
JOIN devices d ON el.device_id = d.device_id
JOIN rooms r   ON d.room_id    = r.room_id
ORDER BY el.log_time;


INSERT INTO energy_logs (device_id, energy_kwh, log_time, status)
VALUES ('D001', 2.50, '2025-04-03 00:00:00', 'active');

UPDATE devices
SET status = 'inactive'
WHERE device_id = 'D003';

DELETE FROM energy_logs
WHERE log_id = 10;


DELIMITER $$

CREATE PROCEDURE GetDailyEnergyByRoom(
    IN p_date DATE
)
BEGIN
    SELECT
        r.room_name,
        SUM(el.energy_kwh)   AS total_kwh,
        COUNT(el.log_id)     AS num_logs,
        ROUND(AVG(el.energy_kwh), 3) AS avg_kwh
    FROM energy_logs el
    JOIN devices d ON el.device_id = d.device_id
    JOIN rooms   r ON d.room_id    = r.room_id
    WHERE DATE(el.log_time) = p_date
    GROUP BY r.room_name
    ORDER BY total_kwh DESC;
END$$

DELIMITER ;

CALL GetDailyEnergyByRoom('2025-04-01');
