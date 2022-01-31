module Controllers
  module SessionHelpers
    def sign_in(options = {})
      user = options[:as] || $admin

      allow(controller).to receive(:authenticate_api_v1_user!).and_return(true)
      allow(controller).to receive(:current_api_v1_user).and_return(user)
    end
  end
end
