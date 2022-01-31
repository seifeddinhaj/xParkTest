FactoryBot.define do
  factory :user do
    name            { Faker::Name::first_name                                                      }
    nickname        { Faker::Name::last_name                                                       }
    sequence(:email)      { |n| "#{name.parameterize}.#{nickname.parameterize}_#{n}@example.com"  }
    password              { 'password'                                                                   }
    password_confirmation { |user| user.password                                                         }

    trait :regular_role do
      after :build do |user|
        user.role = 1
      end
    end

    trait :admin_role do
      after :build do |user|
        user.role = 0
      end
    end

   end
end
