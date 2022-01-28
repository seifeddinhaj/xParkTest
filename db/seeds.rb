# 2 regular users
regular_users = User.create([ { name: 'regular_1_name', nickname: 'regular_1_nickname', email: 'regular_1@gmail.com', password: 'password' },
                              { name: 'regular_2_name', nickname: 'regular_2_nickname', email: 'regular_2@gmail.com', password: 'password' }
                        ])
# 2 admin users
admin_users = User.create([ { name: 'admin_1_name', nickname: 'admin_1_nickname', email: 'admin_1@gmail.com', password: 'password', role: :admin },
                            { name: 'admin_2_name', nickname: 'admin_2_nickname', email: 'admin_2@gmail.com', password: 'password', role: :admin }
                        ])
