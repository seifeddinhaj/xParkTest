require 'rails_helper'

RSpec.describe Vehicle, type: :model do
  describe "database schema" do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:name).of_type(:string) }
    it { should have_db_column(:user_id).of_type(:integer) }
    it { should have_db_column(:current_state_id).of_type(:integer) }

  end

  describe "Indexes" do
    it { should have_db_index(:user_id) }
    it { should have_db_index(:current_state_id) }
  end

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:current_state).optional(true) }
  end

end