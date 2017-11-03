CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  name TEXT,
  description TEXT,
  total_hours INTEGER
);

CREATE TABLE week_time (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  total_time_for_week TEXT
);

CREATE TABLE time (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  week_time INTEGER REFERENCES week_time(id),
  clock_in TIMESTAMP,
  clock_out TIMESTAMP,
  total_time TEXT
);