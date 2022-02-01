class Api::V1::VehiclesController < ApplicationController
  before_action :set_vehicle, only: %I[show update destroy]

  def index
    vehicles = current_api_v1_user.vehicles.includes(:current_state)
    render json: vehicles.to_json(include: :current_state)
  end

  def create
    vehicle = current_api_v1_user.vehicles.new(vehicle_params)
    if vehicle.save
      render json: vehicle.to_json(include: :current_state), status: :created
    else
      render json: { message: vehicle.errors.full_messages.join("\n") }, status: :unprocessable_entity
    end
  end

  def show
    render json: @vehicle.to_json(include: :current_state)
  end

  def update
    if @vehicle.update(vehicle_params)
      render json: @vehicle.to_json(include: :current_state)
    else
      render json: { message: @vehicle.errors.full_messages.join("\n") }, status: :unprocessable_entity
    end
  end

  def destroy
    @vehicle.destroy
    render json: { message: 'Vehicle deleted successfully' }
  end

  private

  def set_vehicle
    @vehicle = Vehicle.find_by_id(params[:id])
    render json: { message: 'Vehicle not found' }, status: :not_found unless @vehicle
  end

  def vehicle_params
    params.require(:vehicle).permit(:name, :current_state_id)
  end
end
