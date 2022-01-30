class Vehicle < ApplicationRecord

  # associations
  belongs_to :user
  belongs_to :current_state, class_name: 'State', optional: true

  # validations
  validates :name, presence: true
  validate :validate_state_order, if: :current_state_id_changed?, on: :update

  # callbacks
  after_initialize :default_values, unless: :persisted?

  private

  def validate_state_order
    old_order = State.find(current_state_id_was).order
    return unless (current_state.order - old_order).abs > 1

    errors.add(:current_state, 'The state of vehicle can only updated one step ahead or one step behind')
  end

  def default_values
    self.current_state ||= State.find_by_position(1)
  end
end
