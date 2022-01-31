require 'rails_helper'

RSpec.describe Api::V1::StatesController, type: :controller  do
  before :each do
    sign_in
    @state1 = create :state, name: 'Designed'
    @state2 = create :state, name: 'Assembled'
    @state3 = create :state, name: 'Painted'
    @state4 = create :state, name: 'Tested'
  end

  describe "GET #index" do
    before :each do
      get :index
    end
    it 'status 200' do
      expect(response.status).to eq(200)
    end
    it 'return all the available states' do
      State.all.each do |state|
        expect(response.body).to have_node(:id).with state.id
      end
    end
  end

  describe "GET #show" do
    before :each do
      get :show, params: { id: @state1.id }
    end

    it 'status 200' do
      expect(response.status).to eq(200)
    end

    it 'return the expected state' do
      expect(response.body).to have_node(:id).with @state1.id
    end

    it "return not found if state don't exist with given id" do
      get :show, params:{ id: "not found"}
      expect(response.body).to have_node(:message).with 'State not found'
    end
  end

  describe "POST #create" do
    state_params = { name: 'test state' }

    it 'status 201' do
      post :create, params: { state: state_params }
      expect(response.status).to eq(201)
    end

    it 'create a state with position eq to State.count' do
      post :create, params: { state: state_params }
      parsed_body = JSON.parse response.body
      expect(parsed_body['position']).to eq State.count
    end

    it 'does not create state if the given position is over State.count' do
      state_params['position'] = 999
      post :create, params: { state: state_params }
      expect(response.status).to eq(422)
    end
  end

  describe "PATCH #update" do
    state_params = { name: 'test state1', position: 4 }

    it 'status 201' do
      patch :update, params: { state: state_params, id: @state1.id }
      expect(response.status).to eq(200)
    end

    it 'update the state name and the state position and reorder the other states' do
      patch :update, params: { state: state_params, id: @state1.id }
      expect(@state1.reload.name).to eq 'test state1'
      expect(@state1.reload.position).to eq 4
      expect(@state2.reload.position).to eq 1
      expect(@state3.reload.position).to eq 2
      expect(@state4.reload.position).to eq 3
    end

    it 'does not update state if the given position is over State.count' do
      state_params[:position] = 999
      patch :update, params: { state: state_params, id: @state1.id }
      expect(response.status).to eq(422)
    end
  end

  describe "DELETE #destroy" do
    before :each do
      delete :destroy, params: { id: @state2.id }
    end

    it 'status 200' do
      expect(response.status).to eq(200)
    end

    it 'delete de state' do
      expect(State.count).to eq 3
    end

    it "return not found if state don't exist with given id" do
      delete :destroy, params: { id: "not found" }
      expect(response.body).to have_node(:message).with 'State not found'
    end
  end

end
