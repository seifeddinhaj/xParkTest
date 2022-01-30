class SetDefaultValue < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :role, 1
  end
end
