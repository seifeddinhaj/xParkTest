class State < ApplicationRecord

  acts_as_list column: :order

  has_many :vehicles, foreign_key: :current_state_id, inverse_of: :current_state, dependent: :nullify

  # validations
  validates :name, presence: true
  validate :valid_order

  # callbacks
  after_create :default_values
  before_destroy :remove_state_from_list
  after_update :update_order, if: :saved_change_to_order?
  after_create :update_order, unless: :created_sequentially?

  private

  def default_values
    self.order ||= State.count + 1
  end

  def created_sequentially?
    order == State.count + 1
  end

  def valid_order
    return if order && ((order - State.count < 1 && persisted?) || (order - State.count <= 1 && new_record?))

    errors.add(:order, 'should be sequential and not exceed the number of the states')
  end

  def update_order
    insert_at(order)
  end

  def remove_state_from_list
    remove_from_list
  end

end
