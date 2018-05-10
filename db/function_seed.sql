CREATE OR REPLACE FUNCTION update_columns_on_employee(columnName TEXT, columnValue TEXT, employeeId BIGINT)
  RETURNS VOID AS
  $$
  DECLARE update_statement TEXT := format('UPDATE EMPLOYEES SET %s = ''%s'' WHERE id = %L',columnName, columnValue, employeeId);
  BEGIN
    EXECUTE update_statement;
end;
$$ LANGUAGE plpgsql;