class State < ApplicationRecord

  acts_as_list

  has_many :vehicles, foreign_key: :current_state_id, inverse_of: :current_state, dependent: :nullify

  # validations
  validates :name, presence: true
  validate :valid_position

  # callbacks
  after_initialize :default_values, if: :new_record?
  before_destroy :remove_from_list
  before_update :update_position

  private

  def default_values
    self.position ||= State.count + 1
  end

  def created_sequentially?
    position == State.count + 1
  end

  def valid_position
    return if position && ((position - State.count < 1 && persisted?) || (position - State.count <= 1 && new_record?))

    errors.add(:position, 'must be sequential and does not exceed the total number of states')
  end

  def update_position
    shuffle_positions_on_intermediate_items position_was, position, id
  end

end
