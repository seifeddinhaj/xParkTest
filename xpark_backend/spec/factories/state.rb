FactoryBot.define do
  factory :state do
    name { Faker::Name.name }
    # position { State.count + 1 }
  end
end
