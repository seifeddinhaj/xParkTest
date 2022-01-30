# 2 regular users
regular_users = User.create([ { name: 'regular_1_name', nickname: 'regular_1_nickname', email: 'regular_1@gmail.com', password: 'password' },
                              { name: 'regular_2_name', nickname: 'regular_2_nickname', email: 'regular_2@gmail.com', password: 'password' }
                        ])
# 2 admin users
admin_users = User.create([ { name: 'admin_1_name', nickname: 'admin_1_nickname', email: 'admin_1@gmail.com', password: 'password', role: :admin },
                            { name: 'admin_2_name', nickname: 'admin_2_nickname', email: 'admin_2@gmail.com', password: 'password', role: :admin }
                        ])
State.create!(
    [
     { name: 'Designed' },
     { name: 'Assembled' },
     { name: 'Painted' },
     { name: 'Tested' },
     ]
    )

regular_users.first.vehicles.create!(name: 'BMW')
regular_users.first.vehicles.create!(name: 'Toyota')
regular_users.last.vehicles.create!(name: 'Mercedes')
regular_users.last.vehicles.create!(name: 'Seat')
admin_users.first.vehicles.create!(name: 'Clio')
admin_users.last.vehicles.create!(name: 'Renault')