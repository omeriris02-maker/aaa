import pg from 'pg';
export const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,max:6,idleTimeoutMillis:10000,connectionTimeoutMillis:10000});
export const q=async(text,values=[])=> (await pool.query(text,values)).rows;
export async function tx(fn){const client=await pool.connect();try{await client.query('BEGIN');const result=await fn(client);await client.query('COMMIT');return result}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}}
export async function migrate(){await pool.query(`
CREATE TABLE IF NOT EXISTS ca_users(id integer PRIMARY KEY CHECK(id=1),email text UNIQUE NOT NULL,password_hash text NOT NULL,created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ca_sessions(id text PRIMARY KEY,user_id integer REFERENCES ca_users(id),expires_at timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS ca_keys(provider text PRIMARY KEY,cipher jsonb NOT NULL,updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ca_settings(id integer PRIMARY KEY CHECK(id=1),data jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS ca_models(id text PRIMARY KEY,provider text NOT NULL,name text NOT NULL,family text NOT NULL,free boolean NOT NULL,enabled boolean DEFAULT false,health text DEFAULT 'untested',failures integer DEFAULT 0,circuit_until timestamptz,last_tested timestamptz,metadata jsonb NOT NULL DEFAULT '{}');
CREATE TABLE IF NOT EXISTS ca_runs(id text PRIMARY KEY,question text NOT NULL,mode text NOT NULL,status text NOT NULL,phase integer DEFAULT 0,cursor integer DEFAULT 0,agent_count integer NOT NULL,state jsonb NOT NULL DEFAULT '{}',answer text,estimate numeric DEFAULT 0,cost numeric,reservation numeric DEFAULT 0,started_at timestamptz DEFAULT now(),updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ca_events(id bigserial PRIMARY KEY,run_id text REFERENCES ca_runs(id),stage text NOT NULL,agent integer,model text,targets jsonb NOT NULL DEFAULT '[]',text text NOT NULL,metadata jsonb DEFAULT '{}',created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ca_costs(id bigserial PRIMARY KEY,run_id text REFERENCES ca_runs(id),kind text NOT NULL,input_tokens integer,output_tokens integer,cost numeric NOT NULL,created_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS ca_provider_state(provider text PRIMARY KEY,next_at timestamptz DEFAULT now(),day date DEFAULT CURRENT_DATE,requests integer DEFAULT 0);
CREATE TABLE IF NOT EXISTS ca_auth_attempts(ip_hash text PRIMARY KEY,attempts integer DEFAULT 0,window_at timestamptz DEFAULT now());
CREATE INDEX IF NOT EXISTS ca_runs_updated ON ca_runs(status,updated_at);
CREATE INDEX IF NOT EXISTS ca_events_run ON ca_events(run_id,id);
`)}
