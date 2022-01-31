require 'rails_helper'

RSpec.describe Api::V1::VehiclesController, type: :controller  do
  before :each do
    @user = create :user, :regular_role
    sign_in as: @user
    @state1 = create :state, name: 'Designed'
    @state2 = create :state, name: 'Assembled'
    @state3 = create :state, name: 'Painted'
    @state4 = create :state, name: 'Tested'
    @vehicle1 = create :vehicle, current_state: @state1, user: @user, name: 'BMW'
    @vehicle2 = create :vehicle, current_state: @state2, user: @user,name: 'Toyota'
  end

  describe "GET #index" do
    before :each do
      get :index
    end
    it 'status 200' do
      expect(response.status).to eq(200)
    end
    it 'return all the available vehicles and their related state' do
      Vehicle.all.each do |vehicle|
        expect(response.body).to have_node(:id).with vehicle.id
        expect(response.body).to have_node(:id).with vehicle.current_state_id
      end
    end
  end

  describe "GET #show" do
    before :each do
      get :show, params: { id: @vehicle1.id }
    end

    it 'status 200' do
      expect(response.status).to eq(200)
    end

    it 'return the expected state' do
      expect(response.body).to have_node(:id).with @vehicle1.id
    end

    it "return not found if state don't exist with given id" do
      get :show, params:{ id: "not found"}
      expect(response.body).to have_node(:message).with 'Vehicle not found'
    end
  end

  describe "POST #create" do
    vehicle_params = { name: 'WW' }

    it 'status 201' do
      post :create, params: { vehicle: vehicle_params }
      expect(response.status).to eq(201)
    end

    it 'create a vehicle related with the first state if state not present in params' do
      post :create, params: { vehicle: vehicle_params }
      expect(response.body).to have_node(:id).with @state1.id
    end
  end

  describe "PATCH #update" do
    vehicle_params = { name: 'Seat' }

    it 'status 200' do
      vehicle_params[:current_state_id] = @state2.id
      patch :update, params: { vehicle: vehicle_params, id: @vehicle1.id }
      expect(response.status).to eq(200)
    end

    it 'does not update vehicle if the given current_state_id is over the next or the previous state' do
      vehicle_params[:current_state_id] = @state4.id
      patch :update, params: { vehicle: vehicle_params, id: @vehicle1.id }
      expect(response.status).to eq(422)
    end
  end

  describe "DELETE #destroy" do
    before :each do
      delete :destroy, params: { id: @vehicle2.id }
    end

    it 'status 200' do
      expect(response.status).to eq(200)
    end

    it 'delete the vehicle' do
      expect(Vehicle.count).to eq 1
    end

    it "return not found if state don't exist with given id" do
      delete :destroy, params: { id: "not found" }
      expect(response.body).to have_node(:message).with 'Vehicle not found'
    end
  end

end
