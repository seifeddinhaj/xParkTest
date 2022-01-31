require 'rails_helper'

RSpec.describe State, type: :model do
  describe "database schema" do
    it { should have_db_column(:id).of_type(:integer) }
    it { should have_db_column(:name).of_type(:string) }
    it { should have_db_column(:position).of_type(:integer) }
  end

  describe "associations" do
    it { should have_many(:vehicles).dependent(:nullify)}
  end

end