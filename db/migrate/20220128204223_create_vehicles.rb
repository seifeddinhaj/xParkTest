class CreateVehicles < ActiveRecord::Migration[6.0]
  def change
    create_table :vehicles do |t|
      t.string :name
      t.belongs_to :user
      t.belongs_to :current_state
      t.timestamps
    end
  end
end
