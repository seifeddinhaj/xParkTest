class Api::V1::StatesController < ApplicationController

  before_action :authorize_only_admin!, only: %I[create update destroy]
  before_action :set_state, only: %I[show update destroy]

  def index
    states = State.all.order(:position)
    render json: states
  end

  def show
    render json: @state
  end

  def create
    state = State.new(state_params)
    if state.save
      render json: state, status: :created
    else
      render json: { message: state.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @state.update(state_params)
      render json: @state
    else
      render json: { message: @state.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @state.destroy
    render json: { message: 'State deleted successfully' }
  end

  private

  def set_state
    @state = State.find_by_id(params[:id])
    render json: { message: 'State not found' }, status: :not_found unless @state
  end

  def state_params
    params.require(:state).permit(:name, :position)
  end
end
