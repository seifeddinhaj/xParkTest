class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_api_v1_user!, unless: :devise_controller?


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role, :name, :nickname, :jobtitle, :phone, :address, :gender, :birthday, :company_id, :description, :post, avatar: :data, uploaded_cv: :data])
  end

  def authorize_only_admin!
    render json: {message: 'Not authorized to do this action' }, status: :unauthorized unless current_api_v1_user.admin?
  end
end
